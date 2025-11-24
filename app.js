// AI 音樂人聲分離 - 主應用程式
class VocalSeparator {
    constructor() {
        this.apiUrl = 'https://winyoulife-vocal-separator.hf.space/api/predict';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const processBtn = document.getElementById('processBtn');

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => fileInput.click());
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }

        if (processBtn) {
            processBtn.addEventListener('click', () => this.processAudio());
        }
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('dropZone');
        if (!dropZone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => this.handleDrop(e), false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            this.handleFiles(files);
        }
    }

    handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            this.handleFiles(files);
        }
    }

    handleFiles(files) {
        const file = files[0];
        
        // 檢查文件類型
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/ogg'];
        if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|flac|m4a|ogg)$/i)) {
            this.showError('請上傳有效的音頻文件（MP3, WAV, FLAC, M4A, OGG）');
            return;
        }

        // 檢查文件大小（50MB）
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError('文件大小不能超過 50MB');
            return;
        }

        this.selectedFile = file;
        this.showFileInfo(file);
    }

    showFileInfo(file) {
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const processBtn = document.getElementById('processBtn');

        if (fileInfo && fileName && fileSize) {
            fileName.textContent = file.name;
            fileSize.textContent = this.formatFileSize(file.size);
            fileInfo.style.display = 'block';
        }

        if (processBtn) {
            processBtn.disabled = false;
            processBtn.classList.add('active');
        }

        // 隱藏上傳區域，顯示文件信息
        const dropZone = document.getElementById('dropZone');
        if (dropZone) {
            dropZone.style.display = 'none';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    async processAudio() {
        if (!this.selectedFile) {
            this.showError('請先選擇文件');
            return;
        }

        try {
            this.showProcessing();
            
            const formData = new FormData();
            formData.append('data', JSON.stringify([this.selectedFile.name]));
            formData.append('file', this.selectedFile);

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('處理失敗，請稍後再試');
            }

            const result = await response.json();
            this.showResults(result);

        } catch (error) {
            console.error('Error:', error);
            this.showError('處理失敗：' + error.message);
        }
    }

    showProcessing() {
        const processingSection = document.getElementById('processingSection');
        const fileInfoSection = document.getElementById('fileInfo');
        const processBtn = document.getElementById('processBtn');

        if (fileInfoSection) {
            fileInfoSection.style.display = 'none';
        }

        if (processBtn) {
            processBtn.disabled = true;
        }

        if (processingSection) {
            processingSection.style.display = 'block';
        }

        // 模擬進度
        this.simulateProgress();
    }

    simulateProgress() {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (!progressBar || !progressText) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            
            progressBar.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 90) {
                clearInterval(interval);
            }
        }, 500);

        this.progressInterval = interval;
    }

    showResults(result) {
        // 清除進度模擬
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }

        const processingSection = document.getElementById('processingSection');
        const resultsSection = document.getElementById('resultsSection');

        if (processingSection) {
            processingSection.style.display = 'none';
        }

        if (resultsSection) {
            resultsSection.style.display = 'block';
        }

        // 顯示結果（這裡需要根據實際 API 返回格式調整）
        console.log('Results:', result);
        
        // 如果有音頻 URL，設置播放器
        if (result.data && result.data.length > 0) {
            this.setupAudioPlayers(result.data);
        }
    }

    setupAudioPlayers(audioData) {
        // 根據實際 API 返回的數據格式設置音頻播放器
        const vocalsPlayer = document.getElementById('vocalsPlayer');
        const instrumentalPlayer = document.getElementById('instrumentalPlayer');
        const vocalsDownload = document.getElementById('vocalsDownload');
        const instrumentalDownload = document.getElementById('instrumentalDownload');

        if (audioData[0] && vocalsPlayer) {
            vocalsPlayer.src = audioData[0];
            if (vocalsDownload) {
                vocalsDownload.href = audioData[0];
            }
        }

        if (audioData[1] && instrumentalPlayer) {
            instrumentalPlayer.src = audioData[1];
            if (instrumentalDownload) {
                instrumentalDownload.href = audioData[1];
            }
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        } else {
            alert(message);
        }
    }

    reset() {
        this.selectedFile = null;
        
        const dropZone = document.getElementById('dropZone');
        const fileInfo = document.getElementById('fileInfo');
        const processingSection = document.getElementById('processingSection');
        const resultsSection = document.getElementById('resultsSection');
        const processBtn = document.getElementById('processBtn');

        if (dropZone) dropZone.style.display = 'flex';
        if (fileInfo) fileInfo.style.display = 'none';
        if (processingSection) processingSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'none';
        
        if (processBtn) {
            processBtn.disabled = true;
            processBtn.classList.remove('active');
        }
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    window.vocalSeparator = new VocalSeparator();
    
    // 重置按鈕
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            window.vocalSeparator.reset();
        });
    }
});
