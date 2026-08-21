# build_files.sh
pip install -r requirements.txt --break-system-packages

# make migrations
python3 manage.py collectstatic --no-input
