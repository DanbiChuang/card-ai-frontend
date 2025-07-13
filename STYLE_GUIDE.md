# Shot2Mail 統一樣式指南

## 概述
本專案使用統一的樣式模板系統，確保所有頁面具有一致的設計語言和用戶體驗。

## 組件結構

### 1. PageTemplate - 頁面模板
統一的頁面佈局組件，提供一致的容器和標題樣式。

```jsx
import { PageTemplate } from '../components';

<PageTemplate
  title="頁面標題"
  subtitle="頁面副標題"
  containerClassName="max-w-md" // 可選：自定義容器寬度
  showBackground={true} // 可選：是否顯示背景色
>
  {/* 頁面內容 */}
</PageTemplate>
```

### 2. StepProgress - 步驟導覽
統一的步驟進度指示器，支援多種顏色主題。

```jsx
import { StepProgress } from '../components';

const steps = ['步驟1', '步驟2', '步驟3', '步驟4'];

<StepProgress 
  steps={steps} 
  currentStep={1} // 當前步驟（0-based）
  theme="blue" // 'blue', 'green', 'purple'
/>
```

### 3. Button - 統一按鈕
標準化的按鈕組件，支援多種樣式和狀態。

```jsx
import { Button } from '../components';

<Button
  onClick={handleClick}
  variant="primary" // 'primary', 'secondary', 'outline', 'ghost'
  size="md" // 'sm', 'md', 'lg'
  disabled={false}
  loading={false}
  className="w-full" // 可選：自定義樣式
>
  按鈕文字
</Button>
```

### 4. Card - 卡片容器
統一的卡片容器組件。

```jsx
import { Card } from '../components';

<Card
  padding="p-6" // 可選：自定義內邊距
  shadow="shadow-md" // 可選：自定義陰影
  rounded="rounded-lg" // 可選：自定義圓角
  background="bg-white" // 可選：自定義背景
>
  {/* 卡片內容 */}
</Card>
```

## 主題顏色

### 藍色主題 (預設)
- 主要：`#2563eb`
- 次要：`#1d4ed8`
- 強調：`#3b82f6`

### 綠色主題
- 主要：`#16a34a`
- 次要：`#15803d`
- 強調：`#22c55e`

### 紫色主題
- 主要：`#9333ea`
- 次要：`#7c3aed`
- 強調：`#a855f7`

## 使用範例

### 完整的頁面範例
```jsx
import React from 'react';
import { PageTemplate, StepProgress, Button } from '../components';

export default function ExamplePage() {
  const steps = ['上傳', '確認', '完成'];
  
  return (
    <PageTemplate
      title="範例頁面"
      subtitle="這是一個使用統一模板的頁面"
    >
      <StepProgress steps={steps} currentStep={1} theme="blue" />
      
      <div className="space-y-4">
        <Button onClick={() => console.log('clicked')}>
          主要按鈕
        </Button>
        
        <Button variant="outline" onClick={() => console.log('outline')}>
          次要按鈕
        </Button>
      </div>
    </PageTemplate>
  );
}
```

## 自定義樣式

### 1. 組件樣式 (components.css)
- 品牌標題樣式
- 背景圖案
- 動畫效果
- 響應式設計

### 2. 工具函數 (utils/styles.js)
- 主題顏色配置
- 間距系統
- 字體大小系統
- 陰影系統
- 圓角系統

## 最佳實踐

1. **一致性**：始終使用統一的組件，避免自定義樣式
2. **可維護性**：修改樣式時，優先修改組件而非個別頁面
3. **可重用性**：將重複的UI元素抽象為組件
4. **響應式**：使用 Tailwind CSS 的響應式類別

## 遷移指南

### 從舊樣式遷移到新模板

1. **替換容器結構**：
   ```jsx
   // 舊方式
   <div className="min-h-screen bg-gray-50 py-8">
     <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
   
   // 新方式
   <PageTemplate containerClassName="max-w-md">
   ```

2. **替換按鈕**：
   ```jsx
   // 舊方式
   <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
   
   // 新方式
   <Button variant="primary">
   ```

3. **替換步驟導覽**：
   ```jsx
   // 舊方式
   <div className="flex items-center justify-center mb-6">
     {/* 手動創建步驟 */}
   
   // 新方式
   <StepProgress steps={steps} currentStep={current} theme="blue" />
   ``` 