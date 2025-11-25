#!/usr/bin/env python3
"""
Vercel 部署檢查腳本
檢查網站是否正確部署並包含 AdSense 代碼
"""

import requests
import re
import time

def check_website(url):
    """檢查網站狀態和 AdSense 代碼"""
    print(f"🔍 正在檢查網站: {url}\n")
    
    try:
        # 發送請求
        print("📡 發送 HTTP 請求...")
        response = requests.get(url, timeout=10)
        
        # 檢查狀態碼
        print(f"✅ HTTP 狀態碼: {response.status_code}")
        if response.status_code != 200:
            print(f"❌ 錯誤：網站返回狀態碼 {response.status_code}")
            return False
        
        html = response.text
        
        # 檢查 AdSense Publisher ID
        print("\n🔍 檢查 AdSense Publisher ID...")
        correct_id = "ca-pub-2844313416500915"
        wrong_id = "ca-pub-2844134165b0925"
        
        if correct_id in html:
            print(f"✅ 找到正確的 Publisher ID: {correct_id}")
        else:
            print(f"❌ 未找到正確的 Publisher ID: {correct_id}")
            if wrong_id in html:
                print(f"⚠️  發現舊的錯誤 ID: {wrong_id}")
            return False
        
        # 檢查 AdSense 腳本
        print("\n🔍 檢查 AdSense 腳本...")
        adsense_script_pattern = r'<script[^>]*src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js'
        if re.search(adsense_script_pattern, html):
            print("✅ AdSense 腳本已正確加載")
        else:
            print("❌ 未找到 AdSense 腳本")
            return False
        
        # 檢查 crossorigin 屬性
        print("\n🔍 檢查 crossorigin 屬性...")
        if 'crossorigin="anonymous"' in html:
            print("✅ crossorigin 屬性已設置")
        else:
            print("⚠️  未找到 crossorigin 屬性")
        
        # 檢查頁面標題
        print("\n🔍 檢查頁面內容...")
        title_match = re.search(r'<title>(.*?)</title>', html)
        if title_match:
            print(f"✅ 頁面標題: {title_match.group(1)}")
        
        # 檢查是否有廣告單元（應該被註解）
        print("\n🔍 檢查廣告單元狀態...")
        if 'data-ad-slot="YOUR_AD_SLOT_ID"' in html:
            print("⚠️  發現未註解的廣告單元佔位符")
        else:
            print("✅ 廣告單元已正確註解（等待審核通過）")
        
        # 檢查 HF Space iframe
        print("\n🔍 檢查 Hugging Face Space 嵌入...")
        if 'winyoulife-vocal-separator.hf.space' in html:
            print("✅ HF Space iframe 已正確嵌入")
        else:
            print("⚠️  未找到 HF Space iframe")
        
        print("\n" + "="*50)
        print("🎉 所有檢查通過！網站已正確部署！")
        print("="*50)
        
        return True
        
    except requests.exceptions.Timeout:
        print("❌ 錯誤：請求超時")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ 錯誤：{e}")
        return False

def main():
    print("="*50)
    print("🚀 Vercel 部署檢查工具")
    print("="*50)
    print()
    
    # 你的 Vercel 網站 URL
    url = "https://vocal-separator-site.vercel.app"
    
    print(f"⏳ 等待 5 秒讓 Vercel 完成部署...\n")
    time.sleep(5)
    
    success = check_website(url)
    
    if success:
        print("\n📋 下一步操作：")
        print("1. 前往 AdSense 後台驗證網站")
        print("2. 等待 Google 審核（通常 1-2 天）")
        print("3. 審核通過後取消註解廣告代碼")
        print(f"\n🌐 網站 URL: {url}")
    else:
        print("\n⚠️  檢查發現問題，請查看上面的錯誤信息")
        print("💡 提示：如果剛剛部署，可能需要等待幾分鐘")

if __name__ == "__main__":
    main()
