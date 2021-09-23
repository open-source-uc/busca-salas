# Icons
from subprocess import Popen

def make_icons():
    procesces = []
    for s in [152, 167, 180]:
        comands = [
            "convert",
            "-size",
            f"{s},{s}",
            "-background",
            "none",
            "assets/icon.min.svg",
            f"public/img/apple/icon/{s}.png",
        ]
        procesces.append(Popen(comands))
    for p in procesces:
        p.wait()

# Apple Splash
def make_splash():
    procesces = []
    for w, h in [
        (1125, 2436),
        (1242, 2208),
        (1536, 2048),
        (1668, 2224),
        (2048, 2732),
        (640, 1136),
        (750, 1334),
    ]:
        density = w * 0.2
        comands = [
            "convert",
            "-background",
            "#2e3440",
            "-density",
            f"{density}x{density}",
            "assets/logo.min.svg",
            "-gravity",
            "center",
            "-extent",
            f"{w}x{h}",
            f"public/img/apple/splash/{w}x{h}.png",
        ]
        procesces.append(Popen(comands))
    for p in procesces:
        p.wait()

if __name__ == "__main__":
    make_icons()
    make_splash()
