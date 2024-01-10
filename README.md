# 墨尔本房价信息平台

## 项目简介

本项目是一个交互式的地图应用，用于展示和分析澳大利亚维多利亚州墨尔本地区的房价信息。通过地图界面，用户可以查看各个郊区的详细信息，包括房屋类型、犯罪记录、学校分布等。

## 功能特点

- **郊区地图展示**：地图上展示了维多利亚州的郊区分布，用户可以通过点击地图上的郊区，查看该区域的详细信息。
- **人口密度可视化**：地图上的不同颜色代表了不同的人口密度，用户可以快速识别各区域的人口分布情况。
- **学校信息展示**：地图提供了学校的基本信息，并在地图上标记了所有学校的位置。
- **房价趋势分析**：提供了从2020年底到2021年全年的房价趋势分析。
- **数据表格展示**：选择地图上的一个区域后，右侧表格会实时更新该区域的更多细节信息。

## 使用说明
1. **设置 Flask 环境**：确保您的计算机上安装了 Python 和 Flask。如果尚未安装 Flask，可以通过以下命令安装：
   ```bash
   pip install flask
   ```
   
2. 运行 Flask 服务器：在项目的根目录下，运行以下命令以启动 Flask 服务器：
   ```bash
   python app.py
   ```
3. 访问网页：Flask 服务器启动后，打开您的网络浏览器，输入以下地址访问项目页面：
   ```bash
   http://127.0.0.1:5000/
   ```
4. 打开应用，您将看到一个展示大墨尔本地区的地图。
5. 点击地图上的郊区，可以在右侧表格中查看该区域的详细信息。
   ![图片描述]([https://github.com/379108810/Melbourne_houseprice/issues/1](https://private-user-images.githubusercontent.com/55655782/295496565-56580488-4977-451d-9856-461686eec0c0.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ4NzUyNjMsIm5iZiI6MTcwNDg3NDk2MywicGF0aCI6Ii81NTY1NTc4Mi8yOTU0OTY1NjUtNTY1ODA0ODgtNDk3Ny00NTFkLTk4NTYtNDYxNjg2ZWVjMGMwLlBORz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTEwVDA4MjI0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU4YTU3MmVjZTljYmI3ZWY1YjMwNDM5OTIxNzI2ODQ5YTRjOWNjYzE4NGQ1OTdhZWEzOWI4NTU2NWUxNDBiZTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Kh706_Tu63VF287FOJH6uZBX5LGlZoORPTIVtWX9n8M))
7. 点击左下角的蓝色按钮，可以切换到学校信息展示模式。
   ![图片描述](https://private-user-images.githubusercontent.com/55655782/295498230-addda832-7a69-431b-9425-83de336d93ac.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ4NzUyNjMsIm5iZiI6MTcwNDg3NDk2MywicGF0aCI6Ii81NTY1NTc4Mi8yOTU0OTgyMzAtYWRkZGE4MzItN2E2OS00MzFiLTk0MjUtODNkZTMzNmQ5M2FjLlBORz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTEwVDA4MjI0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRjYmRkYjc3MjI1OTI2MTMyNjBlMzJiZjM2ZDhmNjYyMDM5Mzc3NTQzNjUzOGJjMzU0YmNmYzQ2ZWMyM2FlMTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.xTTSfszdLNrlxUqLbBR8xREa3f3LHDex330WZ-DDzpU)
9. 位于页面下方的图表显示了所选区域的学校类型及数量和房价趋势。
    ![图片描述](https://private-user-images.githubusercontent.com/55655782/295498544-cf121386-0cfd-456b-8cba-beaa094d95fa.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ4NzUyNjMsIm5iZiI6MTcwNDg3NDk2MywicGF0aCI6Ii81NTY1NTc4Mi8yOTU0OTg1NDQtY2YxMjEzODYtMGNmZC00NTZiLThjYmEtYmVhYTA5NGQ5NWZhLlBORz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTEwVDA4MjI0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA1NzA1ZjdiMmEyMzU3NTU1MzdlOTRmZGY2MjdmYTZjMjIyODNkMTM4MDUwN2FmZDY1MzUzZmUwNTAwNzYyNGUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.RxojGuxdoFZ3xLVRj-OrASoC92fq5pi4Hb9SoYsAbF0)

## 技术栈

- HTML/CSS
- JavaScript
- D3.js
- jQuery

## 安装与启动

（请提供安装和启动项目的具体步骤）

## 数据来源

本项目的数据来源主要有两部分：

- **区划坐标数据**：郊区的地理坐标数据来自于 GitHub 上的开源项目，这些数据提供了维多利亚州各郊区的精确地理位置和边界信息。
- **人口、学校和房屋数据**：这部分数据是通过 R 语言从维多利亚州政府的官方网站爬取得到的。数据包括但不限于郊区的人口统计、房屋类型分布、学校位置等关键信息。



