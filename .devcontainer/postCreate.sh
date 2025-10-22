#!/usr/bin/env bash
set -euo pipefail

# Fix npm cache permissions (avoids EACCES you’ve hit before)
mkdir -p /home/vscode/.npm /home/vscode/.cache
sudo chown -R vscode:vscode /home/vscode/.npm /home/vscode/.cache

# Make python available as `python`
if ! command -v python >/dev/null 2>&1; then
  sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
fi

echo "Node: $(node -v)"
echo "npm: $(npm -v)"
echo "Python: $(python -V)"

# Install UI deps if package.json exists
if [ -f package.json ]; then
  npm ci || npm i
fi
