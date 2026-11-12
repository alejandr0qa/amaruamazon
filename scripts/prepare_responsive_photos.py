"""Smaller copies of existing watermarked photos. Originals and framing stay intact.

Optional asset-maintenance step (Pillow); not required for npm build or deployment.
"""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PHOTOS = ROOT / "assets/photos"
credits = json.loads((PHOTOS / "credits.json").read_text(encoding="utf-8"))
manifest = {}
for name, source in credits.items():
    if name.startswith("hero-") or name.startswith("amazon-river"):
        continue  # Cover carousel already has dedicated mobile photographs.
    image = Image.open(PHOTOS / f"{name}.webp").convert("RGB")
    variants = {}
    for width in (480, 800):
        height = round(image.height * width / image.width)
        target = PHOTOS / f"{name}-{width}.webp"
        # Resize the full image, including its copyright footer. Never crop it off.
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            target, "WEBP", quality=84, method=6
        )
        variants[str(width)] = {"width": width, "height": height, "bytes": target.stat().st_size}
    manifest[name] = variants
(PHOTOS / "responsive.json").write_text(
    json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)
print(f"Prepared {len(manifest) * 2} responsive copies; original files unchanged.")
