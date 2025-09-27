#!/bin/bash

# Deploy script for AllO_G v1.2.0

echo "🚀 Deploying AllO_G v1.2.0..."

# Create version tag
VERSION="v1.2.0"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEPLOY_DIR="deploy_${VERSION}_${TIMESTAMP}"

# Create deployment directory
mkdir -p $DEPLOY_DIR

# Copy all files
echo "📦 Copying files..."
cp -r assets $DEPLOY_DIR/
cp -r css $DEPLOY_DIR/
cp -r docs $DEPLOY_DIR/
cp -r index.html $DEPLOY_DIR/
cp -r js $DEPLOY_DIR/
cp -r manifest.json $DEPLOY_DIR/
cp -r sw.js $DEPLOY_DIR/
cp -r version.txt $DEPLOY_DIR/

# Create info file
echo "📝 Creating deployment info..."
cat > $DEPLOY_DIR/deploy_info.txt << EOF
AllO_U Deployment
Version: $VERSION
Date: $(date)
Features:
EOF

# Create zip archive
echo "🗜️ Creating archive..."
zip -r "${DEPLOY_DIR}.zip" $DEPLOY_DIR

echo "✅ Deployment package ready: ${DEPLOY_DIR}.zip"
echo "📊 Total size: $(du -sh $DEPLOY_DIR | cut -f1)"

# Optional: Upload to server
# scp "${DEPLOY_DIR}.zip" user@server:/path/to/deployment/

#!/bin/bash
echo "🚀 Деплой AllO_G Research на GitHub Pages..."

# Добавляем все изменения
git add .

# Коммитим с временной меткой
git commit -m "🔬 Research update $(date '+%Y-%m-%d %H:%M:%S')"

# Пушим на GitHub
git push origin main

echo "✅ Деплой завершен!"
echo "📱 Откройте на телефоне: https://zoland.github.io/AllO_U/"


echo "🎉 Deployment complete!"

echo "�� AllO_U v1.2.0 запуск..."
echo "🌐 Открываем http://localhost:8000"

# Автоматически открываем браузер (macOS)
sleep 1 && open http://localhost:8000/HTML/ &

# Запускаем сервер из корня AllO_U
python3 -m http.server 8000
