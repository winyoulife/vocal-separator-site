# 📤 如何上傳到 GitHub 並部署到 Vercel

## ✅ 已完成的步驟

我已經幫你完成了：
- ✅ Git 初始化
- ✅ 添加所有文件
- ✅ 創建第一個 commit

## 🎯 你需要做的（2 個步驟）

### 步驟 1：在 GitHub 創建新 Repository

1. **訪問** https://github.com/new
2. **填寫資料**：
   ```
   Repository name: vocal-separator-site
   Description: AI Vocal Separator Website
   Public ✅
   不要勾選 "Add a README file"
   ```
3. **點擊 "Create repository"**

### 步驟 2：上傳代碼

創建完成後，GitHub 會顯示一個頁面，**複製這個命令**：

```bash
git remote add origin https://github.com/你的用戶名/vocal-separator-site.git
git branch -M main
git push -u origin main
```

然後在你的終端（PowerShell 或 CMD）執行：

```bash
cd vercel_site
git remote add origin https://github.com/你的用戶名/vocal-separator-site.git
git branch -M main
git push -u origin main
```

**注意**：把 `你的用戶名` 替換成你的 GitHub 用戶名（應該是 `winyoulife`）

---

## 🚀 方法 2：最簡單的方法（不用 Git）

如果上面太複雜，直接用 Vercel 的拖拉上傳：

1. **訪問** https://vercel.com/new
2. **點擊 "Browse"** 或直接拖拉
3. **選擇 `vercel_site` 文件夾**
4. **點擊 "Deploy"**

完成！不需要 GitHub！

---

## 📋 完整命令（複製貼上）

如果你的 GitHub 用戶名是 `winyoulife`：

```bash
cd vercel_site
git remote add origin https://github.com/winyoulife/vocal-separator-site.git
git branch -M main
git push -u origin main
```

---

## ⚠️ 如果遇到錯誤

### 錯誤 1：需要登入 GitHub

執行：
```bash
git config --global user.name "你的名字"
git config --global user.email "你的郵箱"
```

### 錯誤 2：需要 Personal Access Token

1. 訪問 https://github.com/settings/tokens
2. 點擊 "Generate new token (classic)"
3. 勾選 `repo` 權限
4. 複製 token
5. 在 push 時用 token 作為密碼

---

## 🎉 上傳成功後

1. **訪問 Vercel**: https://vercel.com/new
2. **選擇 "Import Git Repository"**
3. **選擇你的 repo**
4. **點擊 "Deploy"**

完成！你會得到一個網址：
```
https://vocal-separator-site.vercel.app
```

---

## 💡 需要幫助？

告訴我你遇到什麼問題，我會幫你解決！
