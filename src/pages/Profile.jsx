// src/pages/Profile.jsx
import React, { useState, useRef } from 'react';
import { AppCtx } from '../context.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Profile() {
  const { 
    cardData, 
    setCardData, 
    myRole, 
    setMyRole, 
    savedRoles, 
    addRole,
    userProfile,
    setUserProfile
  } = React.useContext(AppCtx);
  
  const [role, setRole] = useState(myRole);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState('');
  
  // 使用者資訊狀態
  const [userInfo, setUserInfo] = useState({
    name: userProfile?.name || '',
    company: userProfile?.company || '',
    title: userProfile?.title || '',
    phone: userProfile?.phone || '',
    cooperationContent: userProfile?.cooperationContent || ''
  });
  
  // 合作內容狀態
  const [cooperationDirection, setCooperationDirection] = useState(userProfile?.cooperationContent || '');
  
  // 名片上傳相關狀態
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // 支援的圖片格式
  const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];
  
  const navigate = useNavigate();

  // 如果沒有名片資料，回到上傳頁
  if (!cardData) {
    navigate('/upload');
    return null;
  }

  // 轉換HEIC檔案為JPEG
  const convertHeicToJpeg = async (file) => {
    try {
      // 動態導入heic2any庫
      const heic2any = (await import('heic2any')).default;
      
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      
      // 創建新的File物件
      const convertedFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
        type: 'image/jpeg'
      });
      
      return convertedFile;
    } catch (error) {
      console.error('HEIC轉換失敗:', error);
      throw new Error('HEIC檔案轉換失敗');
    }
  };

  // 處理名片檔案選擇
  const handleProfileFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
        alert('檔案大小不能超過 10MB');
        return;
      }
      
      // 檢查檔案格式
      const fileType = selectedFile.type.toLowerCase();
      const fileName = selectedFile.name.toLowerCase();
      
      try {
        let processedFile = selectedFile;
        
        // 處理 HEIC/HEIF 格式
        if (fileName.endsWith('.heic') || fileName.endsWith('.heif') || 
            fileType === 'image/heic' || fileType === 'image/heif') {
          console.log('檢測到HEIC檔案，正在轉換...');
          processedFile = await convertHeicToJpeg(selectedFile);
        } else if (!supportedFormats.includes(fileType)) {
          alert('不支援的檔案格式。請使用 JPG、PNG、HEIC、HEIF 或 WebP 格式');
          return;
        }
        
        setProfileFile(processedFile);
        // 創建預覽URL
        const url = URL.createObjectURL(processedFile);
        setProfilePreviewUrl(url);
        
        // 自動上傳並處理
        await handleProfileUpload(processedFile);
        
      } catch (error) {
        console.error('檔案處理失敗:', error);
        alert('檔案處理失敗: ' + error.message);
      }
    }
  };

  // 處理名片上傳
  const handleProfileUpload = async (fileToUpload = null) => {
    const file = fileToUpload || profileFile;
    if (!file) return;
    
    setProfileLoading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      console.log('正在使用AI智能分析您的名片...');
      const { data } = await api.post('/profile-upload', form);
      
      // 更新使用者資訊
      setUserInfo({
        name: data.name || '',
        company: data.company || '',
        title: data.title || '',
        phone: data.phone || '',
        cooperationContent: data.cooperationContent || ''
      });
      
      // 更新合作方向
      setCooperationDirection(data.cooperationDirection || '');
      
      // 更新角色（如果AI推斷出合作方向）
      if (data.cooperationContent && !role) {
        setRole(data.cooperationContent);
      }
      
    } catch (e) {
      console.error('Profile upload error:', e);
      alert('上傳失敗: ' + (e.response?.data?.err || e.message));
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (!role) return alert('請選擇或輸入您的角色');
    if (!userInfo.name) return alert('請填寫您的姓名');
    if (!userInfo.company) return alert('請填寫您的公司');
    
    setMyRole(role);
    setUserProfile({
      ...userInfo,
      cooperationContent: cooperationDirection
    });
    navigate('/letter');
  };

  const handleAddRole = () => {
    if (newRole.trim()) {
      addRole(newRole.trim());
      setRole(newRole.trim());
      setNewRole('');
      setShowAddRole(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">選擇身份</h1>
          <p className="text-gray-600">請填寫您的資訊並選擇合作方向</p>
        </div>

        {/* 步驟導覽 */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">✓</div>
            <div className="text-blue-600 font-medium ml-2">上傳名片</div>
          </div>
          <div className="w-8 h-0.5 bg-blue-600 mx-2"></div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">✓</div>
            <div className="text-blue-600 font-medium ml-2">確認資訊</div>
          </div>
          <div className="w-8 h-0.5 bg-blue-600 mx-2"></div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <div className="text-blue-600 font-medium ml-2">選擇身份</div>
          </div>
          <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className="bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <div className="text-gray-500 font-medium ml-2">生成信件</div>
          </div>
          <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className="bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <div className="text-gray-500 font-medium ml-2">寄出</div>
          </div>
        </div>

        {/* 上傳您自己的名片 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">📷 上傳您自己的名片</h3>
          <p className="text-sm text-blue-600 mb-4">（或自行輸入下方資訊）</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleProfileFileChange}
            className="hidden"
            disabled={profileLoading}
          />
          
          {profileFile ? (
            <div className="text-center">
              <img
                src={profilePreviewUrl}
                alt="名片預覽"
                className="mx-auto max-w-full max-h-48 rounded-lg shadow-sm mb-3"
              />
              <p className="text-sm text-gray-600 mb-3">{profileFile.name}</p>
              <button
                onClick={() => {
                  setProfileFile(null);
                  if (profilePreviewUrl) {
                    URL.revokeObjectURL(profilePreviewUrl);
                    setProfilePreviewUrl(null);
                  }
                }}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded"
              >
                重新選擇
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleProfileUploadClick}
                disabled={profileLoading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
              >
                📁 選擇名片照片
              </button>
              <p className="text-sm text-gray-500 mt-3">
                支援 JPG、PNG、HEIC、HEIF、WebP 格式
              </p>
            </div>
          )}
          
          {profileLoading && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600 mt-2">正在進行 OCR 辨識...</p>
            </div>
          )}
        </div>

        {/* 使用者資訊填寫 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">👤 您的資訊</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">姓名 *</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="請輸入您的姓名"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">公司 *</label>
              <input
                type="text"
                value={userInfo.company}
                onChange={e => setUserInfo({ ...userInfo, company: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="請輸入您的公司"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">職稱</label>
              <input
                type="text"
                value={userInfo.title}
                onChange={e => setUserInfo({ ...userInfo, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="請輸入您的職稱"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">電話</label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="請輸入您的電話"
              />
            </div>
          </div>
        </div>

        {/* 角色選擇 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            您的角色 / 合作方向
          </label>
          
          {/* 常用角色選項 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {savedRoles.map((savedRole) => (
              <button
                key={savedRole}
                onClick={() => setRole(savedRole)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  role === savedRole
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {savedRole}
              </button>
            ))}
            <button
              onClick={() => setShowAddRole(true)}
              className="px-3 py-1 rounded-full text-sm border border-dashed border-gray-400 text-gray-600 hover:border-blue-400 hover:text-blue-600"
            >
              + 新增
            </button>
          </div>

          {/* 自訂角色輸入 */}
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="例如：台灣新創 BD、軟體工程師、產品經理..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 合作方向 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            尋求合作內容 *
          </label>
          <textarea
            value={cooperationDirection}
            onChange={(e) => setCooperationDirection(e.target.value)}
            placeholder="例如：想談 SaaS 串接合作、技術交流、業務合作、投資機會..."
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        

        {/* 按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/card-review')}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            返回確認名片
          </button>
          <button
            onClick={handleNext}
            disabled={!role || !userInfo.name || !userInfo.company || !cooperationDirection}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              !role || !userInfo.name || !userInfo.company || !cooperationDirection
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            下一步：生成合作信
          </button>
        </div>

        {/* 新增角色彈窗 */}
        {showAddRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">新增常用角色</h3>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="輸入角色名稱"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddRole()}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddRole(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={handleAddRole}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  新增
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
