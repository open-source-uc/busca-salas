from __future__ import annotations

import json
from pathlib import Path
import datetime

from polylabel import polylabel

import toml
import yaml


class UnusableDataException(Exception):
    pass


def dict_drop_empty(**obj):
    return {k: v for k, v in obj.items() if v not in (None, "", {})}


def get_campus(element: dict):
    if "parent" in element and element["parent"] and "campus" in element["parent"]:
        return element["parent"]["campus"]
    if "campus" in element:
        return element["campus"]


def get_polygon(location: dict) -> None | list[tuple[float, float]]:
    if location["type"] == "Point":
        return None
    coordinates = location["coordinates"]
    while coordinates[0] and not isinstance(coordinates[0][0], float):
        coordinates = coordinates[0]
    if not (coordinates and coordinates[0]):
        raise UnusableDataException("Bad polygon")
    return coordinates


def get_lat_lng(location: dict):
    if location["type"] == "Polygon":
        polygon = get_polygon(location)
        if polygon:
            return polylabel([polygon])
    elif location["type"] == "Point":
        return location["coordinates"]
    raise UnusableDataException("Mising location")


def get_parent_id(child: dict, all_elements: dict):
    if not child["parent"]:
        return None
    for i, element in enumerate(all_elements):
        if child["parent"]["identifier"] == element["identifier"]:
            return i
    raise UnusableDataException("Parent not found")


def get_contact(element, name) -> None | list:
    if ("contact" in element) and (name in element["contact"]):
        return element["contact"][name]
    return None


def get_social(element, name) -> None | str:
    social = get_contact(element, "social")
    if social:
        for social in social:
            if social["type"] == name:
                return social["url"]
    return None

def get_floor(element):
    floor: str | None = element.get("floor", None)
    if floor:
        floor = floor.strip(" ?")
        if floor.isnumeric():
            return int(floor)
    return None

def get_element_properties(element: dict, i, all_elements):
    if not "location" in element:
        raise UnusableDataException("Doesn't have a location")
    phones = get_contact(element, "phones")
    urls = get_contact(element, "urls")
    emails = get_contact(element, "emails")
    return dict_drop_empty(
        id=i,
        name=element["name"],
        categories=element.get("categories", None),
        description=element.get("information", None),
        campus=get_campus(element),
        latLng=get_lat_lng(element["location"]),
        floor=get_floor(element["location"]),
        parentId=get_parent_id(element, all_elements),
        polygon=get_polygon(element["location"]),
        contact=dict_drop_empty(
            url=urls[0] if urls else None,
            phone=phones[0] if phones else None,
            email=emails[0] if emails else None,
            instagram=get_social(element, "instagram"),
            twitter=get_social(element, "twitter"),
            facebook=get_social(element, "facebook"),
        ),
    )


def dump(module, data: list, **kwargs):
    now = datetime.datetime.now(None).isoformat(timespec="minutes")
    with Path("assets", f"data.{module.__name__}").open("w") as file:
        module.dump({"updated_at": now, "places": data}, file, **kwargs)


def main():
    # Load seeds
    data = []
    for path in Path("assets", "seeds").glob("*.json"):
        with path.open() as file:
            data.extend(json.load(file))
    # Change schema
    new_data = []
    for i, element in enumerate(data):
        try:
            new_element = get_element_properties(element, i, data)
            new_data.append(new_element)
        except UnusableDataException:
            print(element)
    # Dump
    dump(json, new_data, ensure_ascii=False, indent=2)
    dump(toml, new_data)
    dump(yaml, new_data, allow_unicode=True)


if __name__ == "__main__":
    main()
