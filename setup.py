from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in devit_customization/__init__.py
from devit_customization import __version__ as version

setup(
	name="devit_customization",
	version=version,
	description="Customization of Item and Role",
	author="Hardik",
	author_email="hardik.zinzuvadiya@devitpl.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
