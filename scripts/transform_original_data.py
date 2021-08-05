import json
from os import EX_CANTCREAT
from pathlib import Path

HAS_TOML = True
try:
    import toml
except ImportError:
    HAS_TOML = False

HAS_YAML = True
try:
    import yaml
except ImportError:
    HAS_YAML = False


class UnusableDataException(Exception):
    pass


def get_campus(element):
    if "parent" in element and element["parent"] and "campus" in element["parent"]:
        return element["parent"]["campus"]
    if "campus" in element:
        return element["campus"]


def get_polygon(location):
    if location["type"] == "Point":
        return None
    coordinates = location["coordinates"]
    while coordinates[0] and not isinstance(coordinates[0][0], float):
        coordinates = coordinates[0]
    if not (coordinates and coordinates[0]):
        raise UnusableDataException
    return coordinates


def get_lat_lng(location):
    if location["type"] == "Polygon":
        lat_sum, lng_sum = (0, 0)
        polygon = get_polygon(location)
        if not polygon:
            raise UnusableDataException
        for lat, lng in polygon:
            lat_sum += lat
            lng_sum += lng
        count = len(polygon)
        return [lat_sum / count, lng_sum / count]
    if location["type"] == "Point":
        return location["coordinates"]
    raise ValueError


def get_parent_id(child, all_elements):
    if not child["parent"]:
        return None
    for i, element in enumerate(all_elements):
        if child["parent"]["identifier"] == element["identifier"]:
            return i
    raise ValueError


def get_contact(element, name):
    if ("contact" in element) and (name in element["contact"]):
        return element["contact"][name]
    return None


def get_social(element, name):
    social = get_contact(element, "social")
    if not social:
        return None

    for social in social:
        if social["type"] == name:
            return social["url"]
    return None


def get_element_properties(element, i, all_elements):
    if not "location" in element:
        raise UnusableDataException
    phones = get_contact(element, "phones")
    urls = get_contact(element, "urls")
    emails = get_contact(element, "emails")
    return dict(
        id=i,
        name=element["name"],
        location=dict(
            campus=get_campus(element),
            latLng=get_lat_lng(element["location"]),
            floor=element.get("floor", None),
            parentId=get_parent_id(element, all_elements),
            polygon=get_polygon(element["location"]),
        ),
        contact=dict(
            url=urls[0] if urls else "",
            phone=phones[0] if phones else "",
            email=emails[0] if emails else "",
            instagram=get_social(element, "instagram"),
            twitter=get_social(element, "twitter"),
            facebook=get_social(element, "facebook"),
        ),
    )


def main():
    data = []
    for path in Path("assets", "seeds").iterdir():
        if path.suffix == ".json":
            with path.open() as file:
                data.extend(json.load(file))
    new_data = []
    for i, element in enumerate(data):
        try:
            new_element = get_element_properties(element, i, data)
            new_data.append(new_element)
        except UnusableDataException:
            print(element)

    with Path("assets", "data.json").open("w") as file:
        json.dump(new_data, file, ensure_ascii=False, indent=2)

    if HAS_TOML:
        with Path("assets", "data.toml").open("w") as file:
            toml.dump({"place": new_data}, file)
    if HAS_YAML:
        with Path("assets", "data.yaml").open("w") as file:
            yaml.dump({"place": new_data}, file)


if __name__ == "__main__":
    main()
