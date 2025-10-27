#!/bin/bash
echo "🚀 Деплой AllO_G Research на GitHub Pages..."

# Добавляем все изменения
git add .

# Коммитим с временной меткой
git commit -m "🔬 Research update $(date '+%Y-%m-%d %H:%M:%S')"

# Пушим на GitHub
git push origin main

echo "✅ Деплой завершен!"
echo "📱 Откройте на телефоне: https://zoland.github.io/AllO_G/"


echo "�� AllO_G v1.1.5 запуск..."
echo "🌐 Открываем http://localhost:8000"

# Автоматически открываем браузер (macOS)
sleep 1 && open http://localhost:8000/HTML/ &

# Запускаем сервер из корня AllO_G
python3 -m http.server 8000
