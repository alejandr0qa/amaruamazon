"""Create web derivatives with a separate copyright footer; never change originals."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'imagenes-brenda'
DEST = ROOT / 'assets/photos'
DEST.mkdir(parents=True, exist_ok=True)
# Crops are intentional presentation derivatives. Copyright is outside the scene.
PHOTOS = {
    'amazon-river': ('29912.jpg', (1920, 1040)),
    'amazon-river-mobile': ('29912.jpg', (800, 1120)),
    'hero-forest': ('58120.jpg', (1920, 1040)),
    'hero-forest-mobile': ('58120.jpg', (800, 1120)),
    'hero-lilies': ('29829.jpg', (1920, 1040)),
    'hero-lilies-mobile': ('29829.jpg', (800, 1120)),
    'hero-sunset': ('IMG_20260120_175716.jpg', (1920, 1040)),
    'hero-sunset-mobile': ('IMG_20260120_175716.jpg', (800, 1120)),
    'forest': ('58120.jpg', (1000, 1200)),
    'tarapoto': ('IMG_20260211_165021.jpg', (1200, 800)),
    'kayak': ('IMG_20260211_152854.jpg', (1200, 800)),
    'birdwatching': ('IMG-20260218-WA0040.jpg', (1200, 800)),
    'cacao': ('IMG_20260611_102632.jpg', (1200, 800)),
    'night-walk': ('IMG_20260128_184901.jpg', (1200, 800)),
    'camp': ('IMG_20260602_173545.jpg', (1200, 800)),
    'community': ('36271.jpg', (1200, 800)),
    'wildlife': ('IMG-20260330-WA0065.jpg', (1200, 800)),
    'water-lilies': ('29829.jpg', (1200, 800)),
    'frog': ('IMG_20260326_211155.jpg', (1200, 800)),
    'sunset': ('IMG_20260120_175716.jpg', (1200, 800)),
    'forest-canoe': ('IMG-20260320-WA0030.jpg', (1200, 800)),
    'roots': ('IMG_20260312_105741.jpg', (1200, 800)),
}

def make_photo(source, dimensions, dest):
    photo = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    photo = ImageOps.fit(photo, dimensions, method=Image.Resampling.LANCZOS)
    w, h = dimensions
    footer = max(26, round(w * .023))
    output = Image.new('RGB', (w, h + footer), '#173a2d')
    output.paste(photo, (0, 0))
    draw = ImageDraw.Draw(output)
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', max(13, round(w * .012)))
    draw.text((w - max(15, round(w * .018)), h + footer / 2),
              '© Amaru Amazon Experiences', anchor='rm', font=font, fill='#e1dbc1')
    # New image has no source EXIF, GPS or other camera metadata.
    output.save(dest, 'WEBP', quality=84, method=6)
    return {'width': output.width, 'height': output.height, 'bytes': dest.stat().st_size}

manifest = {}
for name, (filename, size) in PHOTOS.items():
    path = SOURCE / filename
    if not path.is_file():
        raise FileNotFoundError(path)
    manifest[name] = {'source': filename, **make_photo(path, size, DEST / f'{name}.webp')}
(DEST / 'credits.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'{len(manifest)} watermarked derivatives, {sum(p["bytes"] for p in manifest.values()) / 1024 / 1024:.1f} MB')

# Keep the supplied full logo at the standard browser and home-screen sizes.
brand = ROOT / 'assets/brand'
logo = Image.open(brand / 'amaru-original.png').convert('RGBA')
logo.resize((64, 64), Image.Resampling.LANCZOS).save(
    brand / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
logo.resize((180, 180), Image.Resampling.LANCZOS).save(brand / 'apple-touch-icon.png')
