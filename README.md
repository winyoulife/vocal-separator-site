# 🎵 AI Vocal Separator - Vercel 部署指南

## 📁 文件結構

```
vercel_site/
├── index.html      # 主頁面
├── styles.css      # 樣式文件
├── script.js       # JavaScript 功能
└── README.md       # 說明文件
```

## 🚀 部署到 Vercel

### 方法 1：通過 GitHub（推薦）

1. **上傳到 GitHub**
   ```bash
   cd vercel_site
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用戶名/vocal-separator-site.git
   git push -u origin main
   ```

2. **在 Vercel 導入**
   - 訪問 https://vercel.com/
   - 點擊 "Import Project"
   - 選擇你的 GitHub repo
   - 點擊 "Deploy"

### 方法 2：直接拖拉上傳

1. 訪問 https://vercel.com/new
2. 將整個 `vercel_site` 文件夾拖到頁面上
3. 點擊 "Deploy"

## 🎯 AdSense 設置

### 1. 替換 AdSense 代碼

在 `index.html` 中找到以下位置並替換：

```html
<!-- 替換這個 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2844134165b0925"
     crossorigin="anonymous"></script>
```

替換成你自己的 AdSense 代碼。

### 2. 設置廣告單元

找到所有的廣告位置（標記為 `<!-- AdSense 廣告位 X -->`），替換：

```html
data-ad-client="ca-pub-2844134165b0925"
data-ad-slot="YOUR_AD_SLOT_ID"
```

## 📝 自訂設置

### 修改 HF Space URL

在 `index.html` 第 120 行左右，找到：

```html
<iframe 
    src="https://winyoulife-vocal-separator.hf.space" 
    ...
</iframe>
```

確保這是你的 HF Space 網址。

### 修改網站標題和描述

在 `index.html` 的 `<head>` 部分修改：

```html
<title>你的網站標題</title>
<meta name="description" content="你的網站描述">
```

### 修改顏色主題

在 `styles.css` 中修改主色調：

```css
/* 找到這些顏色並修改 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #667eea;
```

## ✅ 部署後檢查清單

- [ ] 網站可以正常訪問
- [ ] HF Space iframe 正常顯示
- [ ] 所有連結都能正常工作
- [ ] 在手機上測試顯示
- [ ] AdSense 代碼已添加
- [ ] 網站標題和描述已修改

## 🌐 獲取你的網址

部署完成後，你會得到：
```
https://你的項目名.vercel.app
```

用這個網址申請 AdSense！

## 💡 提示

1. **免費域名**：Vercel 提供免費的 `.vercel.app` 域名
2. **自訂域名**：可以在 Vercel 設置中綁定自己的域名
3. **自動部署**：連接 GitHub 後，每次 push 都會自動部署
4. **HTTPS**：Vercel 自動提供 HTTPS

## 🆘 需要幫助？

如果遇到問題：
1. 檢查 Vercel 的部署日誌
2. 確保所有文件都已上傳
3. 檢查文件路徑是否正確

## 📊 下一步

1. ✅ 部署到 Vercel
2. ✅ 測試網站功能
3. ✅ 添加 AdSense 代碼
4. ✅ 申請 AdSense
5. ✅ 開始賺錢！

---

© 2024 AI Vocal Separator
