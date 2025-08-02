// 储存下载器使用的多语言文本
// 在属性名前面加上下划线，和文本内容做出区别
// {} 是占位符
// <br> 是换行

const langText = {
  _开始抓取: [
    '开始抓取',
    '開始抓取',
    'start crawling',
    'クロールを開始する',
    '크롤링 시작',
  ],
  _或者: [' 或者 ', ' 或是 ', ' or ', ' または ', ' 또는 '],
  _并且: [' 并且 ', ' 並且 ', ' and ', ' かつ ', ' 그리고 '],
  _任务开始: [
    '任务开始',
    '工作開始',
    'Task starts',
    'タスクの開始',
    '작업 시작',
  ],
  _抓取结果为零: [
    '抓取完毕，但没有找到符合筛选条件的文件。',
    '擷取完畢，但沒有找到符合篩選條件的檔案。',
    'Crawl finished but did not find files that match the filter criteria.',
    'フィルタ条件で検索しましたが、該当するファイルは見つかりませんでした。',
    '긁어오기가 완료되었지만 필터 조건과 일치하는 파일을 찾지 못했습니다.',
  ],
  _当前任务尚未完成: [
    '当前任务尚未完成',
    '目前工作尚未完成',
    'The current task has not yet been completed',
    '現在の作業はまだ完了していません',
    '현재 작업이 아직 완료되지 않았습니다',
  ],
  _当前任务尚未完成2: [
    '当前任务尚未完成，请等待完成后再下载。',
    '目前工作尚未完成，請等待完成後再下載。',
    'The current task has not yet been completed',
    '現在のタスクはまだ完了していません。完了するまでお待ちください。',
    '현재 작업이 아직 완료되지 않았습니다.',
  ],
  _关闭: ['关闭', '關閉', 'close', '閉じる', '닫기'],
  _输出信息: [
    '输出信息',
    '輸出資訊',
    'Output information',
    '出力情報',
    '출력 정보',
  ],
  _复制: ['复制', '複製', 'Copy', 'コピー', '복사'],
  _已复制到剪贴板: [
    '已复制到剪贴板，可直接粘贴',
    '已複製至剪貼簿，可直接貼上',
    'Has been copied to the clipboard',
    'クリップボードにコピーしました。',
    '클립보드에 복사되었습니다.',
  ],
  _下载设置: [
    '下载设置',
    '下載設定',
    'Download settings',
    'ダウンロード設定',
    '다운로드 설정',
  ],
  _收起展开设置项: [
    '收起/展开设置项',
    '摺疊/展開設定項目',
    'Collapse/expand settings',
    '設定の折りたたみ/展開',
    '설정 축소/확장',
  ],
  _github: [
    'Github 页面，欢迎 star',
    'Github 頁面，歡迎 star',
    'Github page, if you like, please star it',
    'Github のページ。ぜひ star をください。',
    'Github, 유용하셨다면 Star를 주세요.',
  ],
  _pixivDownloader: [
    'Pixiv 下载器',
    'Pixiv 下載器',
    'Pixiv Downloader',
    'Pixiv ダウンロード',
    'Pixiv 다운로더',
  ],
  _抓取: ['抓取', '擷取', 'Crawl', '保存', '긁어오기'],
  _下载: ['下载', '下載', 'Download', 'ダウンロード', '다운로드'],
  _其他: ['其他', '其他', 'Other', 'その他', '그 외'],
  _快捷键切换显示隐藏: [
    '使用 Alt + X，可以显示和隐藏下载面板',
    '使用 Alt + X，可以顯示和隱藏下載面板',
    'Use Alt + X to show and hide the download panel',
    'Alt + X でダウンロードパネルを表示/非表示にできます。',
    'Alt + X를 사용하여 다운로드 패널 보이기 및 숨기기',
  ],
  _共抓取到n个文件: [
    '共抓取到 {} 个文件',
    '共擷取到 {} 個檔案',
    'Crawl a total of {} files',
    '合計 {} 個のファイルを取得しました。',
    '총 {}개의 파일 긁어오기',
  ],
  _命名规则: [
    ' <span class="key">命名</span>规则',
    '<span class="key">命名</span>規則',
    '<span class="key">Naming</span> rule',
    '<span class="key">命名</span>規則',
    '<span class="key">명명</span> 규칙',
  ],
  _设置文件夹名的提示: [
    `可以使用 '<span class="key">/</span>' 建立文件夹。示例：`,
    `可以使用斜線（<span class="key">/</span>）建立資料夾。範例：`,
    `You can create a directory with '<span class="key">/</span>'. Example：`,
    `フォルダーは '<span class="key">/</span>' で作成できます。例：`,
    `'<span class="key">/</span>'을 사용하여 디렉토리를 생성할 수 있습니다.<br>예:`,
  ],
  _命名标记user: [
    '画师名字',
    '畫師名稱',
    'Artist name',
    'ユーザー名',
    '아티스트명',
  ],
  _命名标记create_id: [
    '画师的创作者 ID（英文名或罗马字）',
    '畫師的創作者 ID（英文名或羅馬字）',
    `Artist's Creator ID (English or Romaji)`,
    'アーティストのクリエイター ID (英語またはローマ字)',
    '아티스트 크리에이터 ID(영어 또는 로마자)',
  ],
  _命名标记uid: [
    '画师 ID（数字）',
    '畫師 ID（數字）',
    'Artist ID (number)',
    'ユーザーID（数字）',
    '아티스트 ID(숫자)',
  ],
  _预览文件名: [
    '预览文件名',
    '預覽檔案名稱',
    'Preview file name',
    'ファイル名',
    '파일명 미리보기',
  ],
  _下载线程: [
    '同时下载<span class="key">数量</span>',
    '同時下載<span class="key">數量</span>',
    'Download <span class="key">thread</span>',
    '同時ダウンロード数',
    '다운로드 <span class="key">쓰레드</span>',
  ],
  _线程数字: [
    '可以输入 1-3 之间的数字，设置同时下载的数量',
    '可以輸入 1-3 之間的數字，設定同時下載的數量',
    'You can type a number between 1-3 to set the number of concurrent downloads',
    '同時にダウンロードするファイルの数を 1-3 で設定します。',
    '1-3 사이의 숫자를 입력하여 동시 다운로드 수를 설정할 수 있습니다.',
  ],
  _下载按钮1: [
    '开始下载',
    '開始下載',
    'start download',
    'ダウンロードを開始',
    '다운로드 시작',
  ],
  _下载按钮2: [
    '暂停下载',
    '暫停下載',
    'pause download',
    'ダウンロードを一時停止',
    '다운로드 일시중지',
  ],
  _下载按钮3: [
    '停止下载',
    '停止下載',
    'stop download',
    'ダウンロードを停止',
    '다운로드 정지',
  ],
  _下载按钮4: ['复制 url', '複製url', 'copy urls', 'URLをコピー', 'URL 복사'],
  _当前状态: [
    '当前状态 ',
    '目前狀態 ',
    'Now state ',
    '現在の状態 ',
    '현재 상태 ',
  ],
  _未开始下载: [
    '未开始下载',
    '未開始下載',
    'Not yet started downloading',
    'まだダウンロードを開始していません。',
    '아직 다운로드를 시작하지 않았습니다.',
  ],
  _常见问题: [
    '常见问题',
    '常見問題',
    'Common problems',
    'よくある質問',
    '자주 묻는 질문',
  ],
  _uuid: [
    `下载器检测到下载后的文件名可能异常。如果文件名是一串随机的字母和数字，或者没有使用下载器设置里的命名规则，就表示发生了此问题。<br>
这不是下载器自身的问题，而是被其他扩展程序影响了，导致下载器设置的文件名丢失。<br>
当你遇到这个问题时，可以考虑下面的处理方法：<br>
1. 推荐：你可以新建一个浏览器本地用户来使用这个下载器。对于 Chrome 和 Edge 浏览器，你可以点击浏览器右上角的头像图标，然后创建新的个人资料（不需要登录 Google 或 Microsoft 账号）。每个用户都有独立的浏览器窗口，所以你可以为新用户安装这个下载器，并且不要安装其他扩展程序。当你需要下载 Pixiv 或 Fanbox 的文件时，使用这个用户进行下载，就可以避免受到其他扩展程序的影响。
<br>
2. 你可以找出导致此问题的扩展程序，并在使用本下载器时，临时禁用它们。这些扩展程序通常具有下载文件、管理下载的功能，例如：IDM Integration Module、Chrono 下载管理器、mage Downloade 等。如果你不确定是哪个扩展导致的，可以先禁用所有扩展，然后一个一个启用，并使用下载器进行下载，这样就可以找出是哪个扩展导致了此问题。<br>
<br>
技术细节：<br>
某些扩展程序会监听 chrome.downloads.onDeterminingFilename 事件，这很容易导致预设的文件名丢失。<br>
假设本下载器为某个文件设置了自定义文件名：user/image.jpg。<br>
如果另一个扩展程序监听了 onDeterminingFilename 事件，浏览器会询问它对文件名的建议（使它有机会修改文件名）。问题在于：此时浏览器传递的文件名是默认的（也就是 URL 里的最后一段路径），而不是下载器设置的文件名。<br>
所以下载器设置的文件名会丢失，并且文件名会变成 URL 里的最后一段路径。<br>`,
    `下載器檢測到下載後的檔名可能異常。如果檔名是一串隨機的字母和數字，或者沒有使用下載器設定裡的命名規則，就表示發生了此問題。<br>
這不是下載器自身的問題，而是被其他擴充套件程式影響了，導致下載器設定的檔名丟失。<br>
當你遇到這個問題時，可以考慮下面的處理方法：<br>
1. 推薦：你可以新建一個瀏覽器本地使用者來使用這個下載器。對於 Chrome 和 Edge 瀏覽器，你可以點選瀏覽器右上角的頭像圖示，然後建立新的個人資料（不需要登入 Google 或 Microsoft 賬號）。每個使用者都有獨立的瀏覽器視窗，所以你可以為新使用者安裝這個下載器，並且不要安裝其他擴充套件程式。當你需要下載 Pixiv 或 Fanbox 的檔案時，使用這個使用者進行下載，就可以避免受到其他擴充套件程式的影響。
<br>
2. 你可以找出導致此問題的擴充套件程式，並在使用本下載器時，臨時禁用它們。這些擴充套件程式通常具有下載檔案、管理下載的功能，例如：IDM Integration Module、Chrono 下載管理器、mage Downloade 等。如果你不確定是哪個擴充套件導致的，可以先禁用所有擴充套件，然後一個一個啟用，並使用下載器進行下載，這樣就可以找出是哪個擴充套件導致了此問題。<br>
<br>
技術細節：<br>
某些擴充套件程式會監聽 chrome.downloads.onDeterminingFilename 事件，這很容易導致預設的檔名丟失。<br>
假設本下載器為某個檔案設定了自定義檔名：user/image.jpg。<br>
如果另一個擴充套件程式監聽了 onDeterminingFilename 事件，瀏覽器會詢問它對檔名的建議（使它有機會修改檔名）。問題在於：此時瀏覽器傳遞的檔名是預設的（也就是 URL 裡的最後一段路徑），而不是下載器設定的檔名。<br>
所以下載器設定的檔名會丟失，並且檔名會變成 URL 裡的最後一段路徑。<br>`,
    `The downloader detects that the file name after downloading may be abnormal. If the file name is a string of random letters and numbers, or does not use the naming rules in the downloader settings, it means that this problem has occurred. <br>
This is not a problem with the downloader itself, but it is affected by other extensions, causing the file name set by the downloader to be lost. <br>
When you encounter this problem, you can consider the following solutions: <br>
1. Recommended: You can create a new browser local user to use this downloader. For Chrome and Edge browsers, you can click the avatar icon in the upper right corner of the browser and create a new profile (no need to log in to a Google or Microsoft account). Each user has a separate browser window, so you can install this downloader for the new user and do not install other extensions. When you need to download files from Pixiv or Fanbox, use this user to download to avoid being affected by other extensions. <br>
2. You can find out the extensions that cause this problem and temporarily disable them when using this downloader. These extensions usually have the functions of downloading files and managing downloads, such as: IDM Integration Module, Chrono Download Manager, mage Downloade, etc. If you are not sure which extension is causing the problem, you can find out which extension is causing the problem by disabling all extensions, then enabling them one by one and downloading them using the Downloader. <br>
<br>
Technical details: <br>
Some extensions listen to the chrome.downloads.onDeterminingFilename event, which can easily cause the preset file name to be lost. <br>
Suppose this Downloader sets a custom file name for a file: user/image.jpg. <br>
If another extension listens to the onDeterminingFilename event, the browser will ask it for suggestions for the file name (giving it a chance to modify the file name). The problem is: the file name passed by the browser is the default (the last path in the URL), not the file name set by the Downloader. <br>
So the file name set by the Downloader is lost, and the file name becomes the last path in the URL. <br>`,
    `ダウンローダーは、ダウンロード後のファイル名が異常である可能性があることを検出しました。ファイル名がランダムな文字と数字の文字列である場合、またはダウンローダー設定の命名規則を使用していない場合は、この問題が発生していることを意味します。<br>
これはダウンローダー自体の問題ではなく、他の拡張機能の影響を受け、ダウンローダーによって設定されたファイル名が失われています。<br>
この問題が発生した場合は、以下の解決策を検討してください。<br>
1. 推奨：このダウンローダーを使用するために、新しいブラウザローカルユーザーを作成できます。ChromeおよびEdgeブラウザの場合、ブラウザの右上隅にあるアバターアイコンをクリックして、新しいプロファイルを作成できます（GoogleまたはMicrosoftアカウントにログインする必要はありません）。ユーザーごとにブラウザウィンドウが異なりますので、新しいユーザー用にこのダウンローダーをインストールし、他の拡張機能はインストールしないでください。PixivやFanboxからファイルをダウンロードする必要がある場合は、他の拡張機能の影響を受けないように、このユーザーを使用してダウンロードしてください。 <br>
2. この問題の原因となっている拡張機能を特定し、このダウンローダーを使用する際に一時的に無効にすることができます。これらの拡張機能は通常、ファイルのダウンロードとダウンロード管理の機能を備えています。例としては、IDM Integration Module、Chrono Download Manager、mage Downloade などがあります。どの拡張機能が問題の原因となっているのかわからない場合は、すべての拡張機能を無効にしてから、1つずつ有効にしてダウンローダーを使用してダウンロードすることで、どの拡張機能が問題の原因となっているのかを特定できます。<br>
<br>
技術的な詳細: <br>
一部の拡張機能は chrome.downloads.onDeterminingFilename イベントをリッスンしており、これによりプリセットされたファイル名が失われる場合があります。<br>
このダウンローダーがファイルにカスタムファイル名（user/image.jpg）を設定するとします。<br>
別の拡張機能が onDeterminingFilename イベントをリッスンしている場合、ブラウザはその拡張機能にファイル名の候補を尋ねます（これにより、拡張機能はファイル名を変更する機会を得ます）。問題は、ブラウザから渡されるファイル名がデフォルト（URL の最後のパス）であり、ダウンローダーによって設定されたファイル名ではないことです。<br>
そのため、ダウンローダーによって設定されたファイル名は失われ、ファイル名が URL の最後のパスになります。<br>`,
    `다운로더가 다운로드 후 파일 이름이 비정상적일 수 있음을 감지했습니다. 파일 이름이 임의의 문자와 숫자로 구성되어 있거나 다운로더 설정의 명명 규칙을 사용하지 않는 경우 이 문제가 발생했음을 의미합니다. <br>
이 문제는 다운로더 자체의 문제가 아니라 다른 확장 프로그램의 영향을 받아 다운로더에서 설정한 파일 이름이 손실되는 것입니다. <br>
이 문제가 발생하면 다음 해결 방법을 고려해 보세요. <br>
1. 권장 사항: 이 다운로더를 사용할 새 브라우저 로컬 사용자를 만들 수 있습니다. Chrome 및 Edge 브라우저의 경우 브라우저 오른쪽 상단의 아바타 아이콘을 클릭하고 새 프로필을 만들 수 있습니다(Google 또는 Microsoft 계정에 로그인할 필요 없음). 각 사용자는 별도의 브라우저 창을 사용하므로 새 사용자를 위해 이 다운로더를 설치하고 다른 확장 프로그램을 설치하지 않아도 됩니다. Pixiv 또는 Fanbox에서 파일을 다운로드해야 하는 경우 다른 확장 프로그램의 영향을 받지 않도록 이 사용자를 사용하여 다운로드하세요. <br>
2. 이 문제를 일으키는 확장 프로그램을 찾아 이 다운로더를 사용할 때 일시적으로 비활성화할 수 있습니다. 이러한 확장 프로그램은 일반적으로 IDM 통합 모듈, Chrono Download Manager, mage Downloade 등과 같이 파일 다운로드 및 다운로드 관리 기능을 제공합니다. 어떤 확장 프로그램이 문제를 일으키는지 확실하지 않은 경우, 모든 확장 프로그램을 비활성화한 후 하나씩 활성화하고 다운로더를 사용하여 다운로드하면 어떤 확장 프로그램이 문제를 일으키는지 확인할 수 있습니다. <br>
<br>
기술 세부 정보: <br>
일부 확장 프로그램은 chrome.downloads.onDeterminingFilename 이벤트를 수신하는데, 이로 인해 미리 설정된 파일 이름이 쉽게 손실될 수 있습니다. <br>
이 다운로더가 파일에 사용자 지정 파일 이름(user/image.jpg)을 설정한다고 가정해 보겠습니다. <br>
다른 확장 프로그램이 onDeterminingFilename 이벤트를 수신하는 경우, 브라우저는 해당 확장 프로그램에 파일 이름을 제안하도록 요청하여 파일 이름을 수정할 수 있는 기회를 제공합니다. 문제는 브라우저에서 전달된 파일 이름이 다운로더에서 설정한 파일 이름이 아니라 기본값(URL의 마지막 경로)이라는 것입니다. <br>
따라서 다운로더에서 설정한 파일 이름은 사라지고, 파일 이름이 URL의 마지막 경로가 됩니다. <br>`,
  ],
  _下载说明: [
    "下载的文件保存在浏览器的下载目录里。<br>请不要在浏览器的下载选项里选中'总是询问每个文件的保存位置'。<br><b>如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。</b><br>QQ群：853021998",
    '下載的檔案儲存在瀏覽器的下載目錄裡。<br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><b>如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。</b><br>QQ群：853021998',
    'The downloaded file is saved in the browser`s download directory. <br><b>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.</b>',
    'ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><b>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。</b>',
    '다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다. <br><b>다운로드 후 파일명이 비정상인 경우 다운로드 기능이 있는 다른 브라우저 확장 프로그램을 비활성화해주세요.</b>',
  ],
  _正在下载中: [
    '正在下载中',
    '正在下載',
    'Downloading',
    'ダウンロード中',
    '다운로드 중',
  ],
  _下载完毕: [
    '✓ 下载完毕!',
    '✓ 下載完畢!',
    '✓ Download finished!',
    '✓ ダウンロードが完了しました！',
    '✓ 다운로드 완료!',
  ],
  _已暂停: [
    '下载已暂停',
    '下載已暫停',
    'Download is paused',
    'ダウンロードを一時停止中です。',
    '다운로드 일시중지',
  ],
  _已停止: [
    '下载已停止',
    '下載已停止',
    'Download stopped',
    'ダウンロードを停止しました。',
    '다운로드 정지',
  ],
  _已下载: ['已下载', '已下載', 'downloaded', 'ダウンロードした', '다운로드됨'],
  _抓取完毕: [
    '抓取完毕！',
    '擷取完畢！',
    'Crawl finished!',
    'クロールが完了しました！',
    '긁어오기 완료!',
  ],
  _自动开始下载: [
    '<span class="key">自动</span>开始下载',
    '<span class="key">自動</span>開始下載',
    'Download starts <span class="key">automatically</span>',
    'ダウンロードを自動的に開始する',
    '<span class="key">자동으로</span> 다운로드 시작',
  ],
  _自动下载的提示: [
    '当“开始下载”状态可用时，自动开始下载，不需要点击下载按钮。',
    '當可下載時自動開始下載，不需要點選下載按鈕。',
    'When the &quot;Start Download&quot; status is available, the download starts automatically and no need to click the download button.',
    '「ダウンロードを開始する」ステータスが有効になると、ダウンロードが自動的に開始され、ダウンロードボタンをクリックする必要がなくなります。',
    '&quot;다운로드 시작&quot; 상태가 활성화되면, 다운로드가 자동으로 시작되고 다운로드 시작 버튼을 클릭할 필요가 없게 됩니다.',
  ],
  _文件下载失败: [
    '文件 {} 下载失败',
    '檔案 {} 下載失败',
    'File {} download failed',
    'ファイル {} のダウンロードに失敗しました。',
    '{} 파일 다운로드 실패',
  ],
  _是否重置设置: [
    '是否重置设置？',
    '是否重設設定？',
    'Do you want to reset the settings?',
    '設定をリセットしますか？',
    '설정을 초기화하시겠습니까?',
  ],
  _id范围: [
    '<span class="key">ID</span> 范围',
    '<span class="key">ID</span> 範圍',
    '<span class="key">ID</span> range',
    '<span class="key">ID</span>の範囲',
    '<span class="key">ID</span> 범위',
  ],
  _设置id范围提示: [
    '您可以输入一个投稿 ID，抓取比它新或者比它旧的投稿',
    '您可以輸入一個投稿 ID，擷取比它新或者比它舊的投稿。',
    'You can enter a work ID and crawl posts that are newer or older than it',
    '1つの投稿IDを入力することで、それより新しいあるいは古い投稿をまとめてダウンロードすることができます。',
    '1개의 게시물 ID를 입력하면 그보다 새로운 혹은 오래된 게시물을 일괄 다운로드 받을 수 있습니다.',
  ],
  _大于: ['大于', '大於', 'Bigger than', 'より新しい', '보다 큼'],
  _小于: ['小于', '小於', 'Less than', 'より古い', '보다 작음'],
  _投稿时间: [
    '投稿<span class="key">时间</span>',
    '投稿<span class="key">時間</span>',
    'Posting <span class="key">date</span>',
    '投稿<span class="key">日時</span>',
    '투고 <span class="key">날짜</span>',
  ],
  _设置投稿时间提示: [
    '您可以下载指定时间内发布的投稿',
    '您可以下載指定時間内發佈的投稿',
    'You can download posts published within a specified time',
    '指定期間内の投稿をまとめてダウンロードできます。',
    '지정된 기간 내에 게시물을 다운로드할 수 있습니다.',
  ],
  _没有数据可供使用: [
    '没有数据可供使用',
    '沒有資料可供使用',
    'No data is available.',
    '該当するデータはありません。',
    '사용 가능한 데이터가 없습니다.',
  ],
  _最小值: ['最小值', '最小值', 'Minimum value', '最小値', '최소'],
  _最大值: ['最大值', '最大值', 'maximum value', '最大値', '최대'],
  _文件类型: [
    '<span class="key">文件</span>类型',
    '<span class="key">檔案</span>類型',
    '<span class="key">File</span> type',
    '<span class="key">ファイル</span>タイプ',
    '<span class="key">파일</span> 유형',
  ],
  _图片: ['图片', '圖片', 'Image', '画像', '이미지'],
  _视频: ['视频', '影片', 'Video', '映像', '동영상'],
  _音乐: ['音频', '音訊', 'Audio', '音声', '오디오'],
  _压缩文件: [
    '压缩文件',
    '壓縮檔',
    'Compressed file',
    '圧縮ファイル',
    '압축된 파일',
  ],
  _PS文件: ['源文件', '原始檔', 'Source File', 'ソースファイル', '소스 파일'],
  _费用类型: [
    '<span class="key">费用</span>类型',
    '<span class="key">費用</span>型別',
    '<span class="key">Fee</span> type',
    '<span class="key">料金</span>タイプ',
    '<span class="key">수수료</span> 유형',
  ],
  _免费投稿: ['免费投稿', '免費投稿', 'Free post', '無料投稿', '무료 게시물'],
  _付费投稿: ['付费投稿', '付費投稿', 'Paid post', '有償投稿', '유료 게시물'],
  _价格范围: [
    '<span class="key">价格</span>范围',
    '<span class="key">價格</span>範圍',
    '<span class="key">Price</span> range',
    '<span class="key">価格</span>帯',
    '<span class="key">가격</span> 범위',
  ],
  _保存投稿中的外部链接: [
    '保存投稿中的外部<span class="key">链接</span>',
    '儲存投稿中的外部<span class="key">連結</span>',
    'Save external <span class="key">links</span> in the posts',
    '本文中の外部<span class="key">リンク</span>を保存',
    '게시물의 외부 <span class="key">링크</span> 저장',
  ],
  _保存投稿中的文字: [
    '保存投稿中的<span class="key">文字</span>',
    '儲存投稿中的<span class="key">文字</span>',
    'Save the <span class="key">text</span> in the posts',
    '投稿の<span class="key">本文</span>を保存',
    '게시물의 <span class="key">본문</span> 저장',
  ],
  _抓取文件数量: [
    '已获取 {} 个文件',
    '已取得 {} 個檔案',
    '{} Files acquired',
    '{} 個のファイルを取得',
    '{}개의 파일을 획득하였습니다',
  ],
  _早于: ['早于', '早於', 'Earlier than', 'より前', '보다 이전'],
  _晚于: ['晚于', '晚於', 'Later than', 'より後', '보다 이후'],
  _抓取赞助的所有用户的投稿: [
    '抓取赞助的所有用户的投稿',
    '擷取所有贊助用戶的投稿',
    'Crawl all sponsored posts',
    '支援中のユーザーの投稿をまとめて保存',
    '지원 중인 모든 크리에이터의 게시물 긁어오기',
  ],
  _没有赞助的用户: [
    '没有可用的数据，可能是因为你没有赞助的创作者。如果你认为是程序错误，请向作者反馈。',
    '沒有可用的資料，可能是因為你沒有贊助的創作者。如果你認為是程式錯誤，請向作者反饋。',
    `There is no available data, probably because you don't have a sponsored creator. If you think it's a program error, please give feedback to the author.`,
    '利用可能なデータがありません。おそらくスポンサークリエイターがいないためです。 プログラミングのミスだと思われる場合は、作者にフィードバックしてください。',
    '스폰서 크리에이터가 없기 때문에 사용할 수 있는 데이터가 없습니다. 프로그래밍 오류라고 생각되면 작성자에게 피드백을 보내주세요.',
  ],
  _抓取关注的所有用户的投稿: [
    '抓取关注的所有用户的投稿',
    '抓取關注的所有使用者的投稿',
    'Crawl all posts of following users',
    'フォローしているユーザーのすべての投稿をクロールする',
    '다음 사용자의 모든 게시물을 크롤링합니다.',
  ],
  _抓取关注的所有用户的投稿的提示: [
    `提示：关注的用户里不包含赞助的用户。\n\n如果你有多个关注的用户，抓取他们的所有投稿可能会产生大量的网络请求。你可以根据需要设置一些过滤条件，以避免产生不必要的抓取。例如设置“费用类型”、“投稿时间”等。\n\n是否立即开始抓取？`,
    `提示：關注的使用者裡不包含贊助的使用者。\n\n如果你有多個關注的使用者，抓取他們的所有投稿可能會產生大量的網路請求。你可以根據需要設定一些過濾條件，以避免產生不必要的抓取。例如設定“費用型別”、“投稿時間”等。\n\n是否立即開始抓取？`,
    `Tip: Followed users do not include sponsored users. \n\nIf you have multiple followed users, crawling all their posts may generate a large number of network requests. You can set some filtering conditions as needed to avoid unnecessary crawling. For example, set "fee type", "post time", etc. \n\nDo you want to start crawling now?`,
    `ヒント: フォローしているユーザーにはスポンサーユーザーは含まれません。\n\nフォローしているユーザーが複数いる場合、そのユーザーの投稿をすべてクロールすると、大量のネットワーク リクエストが発生する可能性があります。不要なクロールを回避するために、必要に応じてフィルタリング条件を設定できます。たとえば、「料金タイプ」、「投稿時間」などを設定します。\n\n今すぐクロールを開始しますか?`,
    `팁: 팔로우된 사용자에는 스폰서 사용자가 포함되지 않습니다. \n\n팔로우된 사용자가 여러 명인 경우 모든 게시물을 크롤링하면 많은 수의 네트워크 요청이 생성될 수 있습니다. 불필요한 크롤링을 피하기 위해 필요에 따라 일부 필터링 조건을 설정할 수 있습니다. 예를 들어 "수수료 유형", "게시 시간" 등을 설정합니다. \n\n지금 크롤링을 시작하시겠습니까?`,
  ],
  _正在关注的创作者: [
    '正在关注的创作者',
    '關注中的創作者',
    'Followed Creators',
    'フォロー中のクリエイター',
    '팔로우 중인 크리에이터',
  ],
  _没有找到关注的用户: [
    '没有找到关注的用户',
    '沒有找到關注的創作者',
    'No following users found',
    'フォローしているユーザーが見つかりません',
    '다음 사용자를 찾을 수 없습니다.',
  ],
  _你可以在首页和关注的创作者页面里使用此功能: [
    '你可以在 Fanbox 主页和关注的创作者页面里使用此功能。',
    '你可以在 Fanbox 主頁和關注的創作者頁面裡使用此功能',
    'You can use this feature on the Fanbox homepage and the creators you follow page.',
    'この機能は、Fanboxホームページやフォローしているクリエイターのページでご利用いただけます。',
    '이 기능은 Fanbox 홈페이지와 팔로우하는 크리에이터 페이지에서 사용할 수 있습니다.',
  ],
  _抓取该用户的投稿: [
    '抓取该用户的投稿',
    '擷取該用戶的投稿',
    "Crawl this user's posts",
    'このユーザーの投稿をまとめて保存',
    '이 크리에이터의 게시물 긁어오기',
  ],
  _抓取该tag的投稿: [
    '抓取该 tag 的投稿',
    '擷取該 tag 的投稿',
    'Crawl posts with this tag',
    'このタグの投稿をまとめて保存',
    '이 태그를 사용하여 게시물 긁어오기',
  ],
  _抓取这篇投稿: [
    '抓取这篇投稿',
    '擷取這篇投稿',
    'Crawl this post',
    'この投稿を保存',
    '이 게시물을 긁어오기',
  ],
  _抓取商品的封面图: [
    '抓取商品的封面图',
    '擷取商品的封面圖',
    'Crawl the cover image of the product',
    '投稿の表紙画像を保存',
    '게시물의 표지 이미지를 긁어오기',
  ],
  _命名标记postid: ['投稿 ID', '投稿 ID', 'Post ID', '投稿ID', '게시물 ID'],
  _命名标记title: [
    '投稿标题',
    '投稿標題',
    'Post title',
    '投稿のタイトル',
    '게시물 제목',
  ],
  _命名标记tags: [
    '投稿的 tag 列表（可能为空）',
    '投稿的 tag 列表（可能為空）',
    "Post's tag list (may be empty)",
    '投稿のタグリスト（空の場合があります）',
    '게시물의 태그 목록 (비어있을 수 있음)',
  ],
  _命名标记date: [
    '投稿的发布日期，如 2019-08-29',
    '投稿的發布日期，如 2019-08-29',
    'The publication date of the post, such as 2019-08-29',
    '投稿日など，例 2019-08-29',
    '게시물의 투고일. 예: 2019-08-29',
  ],
  _命名标记fee: [
    '投稿的价格',
    '投稿的價格',
    'Post price',
    '支援額',
    '게시물 가격',
  ],
  _命名标记index: [
    '文件在它所属的投稿里的序号',
    '檔案在它所屬的投稿裡的序號',
    'The serial number of the file in the post it belongs to',
    '投稿内のファイルの連番',
    '게시물의 파일 일련번호',
  ],
  _命名标记name: [
    '文件在投稿里的文件名',
    '檔案在投稿裡的名稱',
    'File name in the post',
    '投稿内のファイル名',
    '게시물의 파일명',
  ],
  _命名标记ext: [
    '文件的扩展名',
    '檔案的副檔名',
    'File extension',
    'ファイルの拡張子',
    '파일 확장자',
  ],
  _命名标记提醒: [
    '您可以使用多个标记；建议在不同标记之间添加分割用的字符。示例：{postid}-{title}<br>建议在命名规则中包含 {postid} 和 {index}，防止文件名重复。',
    '您可以使用多個標記；建議在不同標記之間加入分隔用的字元。範例：{postid}-{title}<br>建議在命名規則中包含 {postid} 和 {index}，防止檔名重複。',
    'You can use multiple tags; it is recommended to add characters to separate between different tags. Example: {postid}-{title} <br> It is recommended to include {postid} and {index} in the naming rules to prevent duplicate file names.',
    '複数のタグを使用できます。異なるタグを区切るために文字を追加することを推奨します。 例：{postid}-{title} <br>ファイル名の衝突を防ぐために、命名規則に{postid}と{index}を含めることを推奨します。',
    '여러 태그를 사용할 수 있습니다. 서로 다른 태그 사이에 구분자를 넣는 것을 권장합니다.<br>예: {title}-{postid}<br>파일명이 중복되지 않도록 명명 규칙에 {postid}와 {index}를 포함할 것을 권장합니다.',
  ],
  _日期格式: [
    '日期和时间<span class="key">格式</span>',
    '日期和時間<span class="key">格式</span>',
    'Date and time <span class="key">format</span>',
    '日付と時刻の書式',
    '날짜 및 시간 <span class="key">형식</span>',
  ],
  _日期格式提示: [
    '你可以使用以下标记来设置日期和时间格式。这会影响命名规则里的 {date} 和 {task_date}。<br>对于时间如 2021-04-30T06:40:08',
    '你可以使用以下標記來設定日期和時間格式。這會影響命名規則裡的 {date} 和 {task_date}。<br>對於資料如：2021-04-30T06:40:08。',
    'You can use the following notation to set the date and time format. This will affect {date} and {task_date} in the naming rules. <br>For time such as 2021-04-30T06:40:08',
    '以下のタグを使用して日時の書式を設定できます。 これは命名規則の {date} と {task_date} に影響します。 <br> 例：2021-04-30T06:40:08',
    '아래 태그를 사용하여 날짜 형식을 설정할 수 있습니다.<br>이것은 명명 규칙의 {date}와 {task_date}에 영향을 미칩니다.<br>예: 2021-04-30T 06:40:08',
  ],
  _命名标记taskDate: [
    '本次任务抓取完成时的时间。例如：2020-10-21',
    '本次工作擷取完成時的時間。例如：2020-10-21。',
    'The time when the task was crawl completed. For example: 2020-10-21',
    'タスクを完了した日時。 例：2020-10-21',
    '긁어오기 작업 완료 날짜. 예: 2020-10-21',
  ],
  _提示: ['提示', '提示', 'tip', 'ヒント', '팁'],
  _保存投稿中的封面图片: [
    '保存投稿中的<span class="key">封面</span>图片',
    '儲存投稿中的<span class="key">封面</span>圖片',
    'Save the <span class="key">cover</span> image in the posts',
    '投稿の<span class="key">表紙</span>画像を保存',
    '게시물의 <span class="key">표지</span> 이미지 저장',
  ],
  _列表页抓取完成: [
    '列表页面抓取完成',
    '清單頁面擷取完成',
    'The list page is crawled',
    'リストページがクロールされ',
    '목록 페이지를 긁어왔습니다',
  ],
  _当前有x个投稿: [
    '当前有 {} 个投稿 ',
    '目前有 {} 個投稿 ',
    'There are now {} posts',
    '今は　{}　枚の投稿があります ',
    '현재 {}개의 게시물이 있습니다',
  ],
  _开始获取投稿信息: [
    '开始获取投稿信息',
    '開始取得投稿資訊',
    'Start getting post data',
    '投稿情報の取得を開始します',
    '게시물 데이터 취득을 시작합니다',
  ],
  _待处理: ['待处理', '待處理', 'Pending', '処理待ち', '처리 대기'],
  _共抓取到n个作品: [
    '共抓取到 {} 个投稿',
    '共擷取到 {} 個投稿',
    'Crawl a total of {} posts',
    '合計 {} 件の投稿があります',
    '총 {}개의 게시물을 긁어오기',
  ],
  _最近更新: [
    '最近更新',
    '最近更新',
    'What`s new',
    '最近更新する',
    '최근 업데이트',
  ],
  _我知道了: ['我知道了', '我知道了', 'OK', '分かりました', '확인'],
  _格式错误: [
    '格式错误',
    '格式錯誤',
    'Format error',
    'フォーマットエラー',
    '형식 오류',
  ],
  _导入成功: [
    '导入成功',
    '匯入成功',
    'Import successfully',
    'インポート成功',
    '가져오기 성공',
  ],
  _导出成功: [
    '导出成功',
    '匯出成功',
    'Export successfully',
    'エクスポート成功',
    '내보내기 성공',
  ],
  _确定: ['确定', '確定', 'Ok', '確定', '확인'],
  _时间范围: ['时间范围', '時間範圍', 'Time range', '時間範囲', '시간 범위'],
  _背景图片: [
    '<span class="key">背景</span>图片',
    '<span class="key">背景</span>圖片',
    '<span class="key">Background</span> image',
    '<span class="key">背景</span>画像',
    '<span class="key">배경</span> 이미지',
  ],
  _选择文件: [
    '选择文件',
    '選擇檔案',
    'Select a file',
    'ファイルを選択',
    '파일 선택',
  ],
  _不透明度: ['不透明度', '不透明度', 'Opacity', '不透明度', '투명도'],
  _对齐方式: ['对齐方式', '對齊方式', 'Alignment', '揃え方式', '정렬'],
  _顶部: ['顶部', '頂部', 'top', '上揃え', '상단'],
  _居中: ['居中', '居中', 'center', '中央揃え', '중앙'],
  _常见问题说明: [
    `下载器不能绕过付费限制。
    <br><br>
    下载的文件保存在浏览器的下载目录里。如果你想保存到其他位置，需要修改下载器的下载目录。
    <br><br>
    建议在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。
    <br><br>
    如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。
    <br><br>
    下载器 QQ 群：853021998
    <br><br>
    如果你需要一个机场（梯子）的话，可以试试我现在用的机场：魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>，性价比很高，9.9 元 768 GB 流量（倍率都是 1x），而且速度很快，下载国外网盘的文件时可以跑满我的带宽（70 MB/s）。
    <br>
    如果上面的网址打不开，可以访问地址发布页：<a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
    <br>
    你也可以查看我写的使用体验：<a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">魔法喵使用体验</a>
    <br>
    我的邀请码：GYjQWDob
    <br><br>
    `,
    '下載器不能繞過付費限制。<br><br>下載的檔案儲存在瀏覽器的下載目錄裡。<br><br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><br>如果下載後的檔名異常，請停用其他有下載功能的瀏覽器擴充功能。<br><br>',
    'Downloaders cannot bypass paid restrictions.<br><br>The downloaded file is saved in the browser`s download directory. <br><br>It is recommended to turn off "Ask where to save each file before downloading" in the browser`s download settings.<br><br>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.<br><br>',
    'ダウンローダーは、有料の制限を回避できません。<br><br>ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><br>ブラウザのダウンロード設定で 「 ダウンロード前に各ファイルの保存場所を確認する 」 をオフにすることをお勧めします。<br><br>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。<br><br>',
    '다운로더는 유료 제한을 우회할 수 없습니다.<br><br>다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다.<br><br>브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치 확인"을 끄는 것이 좋습니다.<br><br>다운로드 후 파일명이 이상할 경우 다운로드 기능이 있는 다른 브라우저 확장 프로그램을 비활성화해주세요.<br><br>',
  ],
  _赞助我: ['赞助我', '贊助我', 'Sponsor me', '支援する', '후원하기'],
  _赞助方式提示: [
    `如果您觉得这个工具对您有帮助，可以考虑赞助我，谢谢！<br>
    您可以在 Patreon 上赞助我：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
    中国大陆用户可以在“爱发电”上赞助我：<br>
    <a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
    也可以扫描二维码：<br>
    <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">在 Github 上查看二维码</a>。
    `,
    `如果您覺得這個工具對您有幫助，可以考慮贊助我，謝謝！<br>
    您可以在 Patreon 上贊助我：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
    中國大陸使用者可以在“愛發電”上贊助我：<br>
    <a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a>
    `,
    `If you find this tool helpful, please consider sponsoring me, thank you!<br>
    You can sponsor me on Patreon: <br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a>
    `,
    `このツールが役に立ったと思われる場合は、スポンサーになることをご検討ください。ありがとうございます。<br>
    ご支援してくださった方は、以下の Patreon で：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank"> https://www.patreon.com/xuejianxianzun </a>
    `,
    `이 도구가 도움이 된다면 후원해 보시기 바랍니다. 감사합니다!<br>
    Patreon에서 저를 후원해주세요<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a>
    `,
  ],
  _隐藏下载面板: [
    '隐藏下载面板（Alt + X）',
    '隱藏下載面板（Alt + X）',
    'Hide the download panel (Alt + X)',
    'ダウンロードパネルを非表示にする（Alt + X）',
    '다운로드 패널 숨기기 (Alt + X)',
  ],
  _显示下载面板: [
    '显示下载面板 (Alt + X)',
    '顯示下載面板 (Alt + X)',
    'Show download panel (Alt + X)',
    'ダウンロードパネルを表示 (Alt + X)',
    '다운로드 패널 보이기 (Alt + X)',
  ],
  _输出内容太多已经为你保存到文件: [
    '因为输出内容太多，已经为您保存到文件。',
    '因為輸出內容太多，已經為你儲存到檔案。',
    'Because the output is too much, it has been saved to a file.',
    '出力内容が多いため、txt ファイルに保存しました。',
    '출력 내용이 너무 많아, 파일로 저장했습니다.',
  ],
  _保存: ['保存', '儲存', 'Save', '保存', '저장'],
  _加载: ['加载', '載入', 'Load', 'ロード', '불러오기'],
  _保存命名规则提示: [
    '保存命名规则，最多 20 个',
    '儲存命名規則，最多 20 個',
    'Save naming rule, up to 20',
    '命名規則を保存します。最大 20 個まで',
    '명명 규칙 저장, 최대 20개',
  ],
  _已保存命名规则: [
    '已保存命名规则',
    '已儲存命名規則',
    'Naming rule saved',
    '命名規則を保存しました',
    '명명 규칙이 저장되었습니다.',
  ],

  _快速下载本页: [
    '快速下载本页作品 (Alt + Q)',
    '快速下載本頁作品 (Alt + Q)',
    'Download this work quickly (Alt + Q)',
    'この作品をすばやくダウンロードする (Alt + Q)',
    '작품 빠른 다운로드 (Alt + Q)',
  ],
  _高亮显示关键字: [
    '<span class="key">高亮</span>显示关键字',
    '<span class="key">標明</span>顯示關鍵字',
    '<span class="key">Highlight</span> keywords',
    'キーワードを強調表示',
    '<span class="key">강조</span> 키워드 표시',
  ],
  _导出: ['导出', '匯出', 'Export', 'エクスポート', '내보내기'],
  _导入: ['导入', '匯入', 'Import', 'インポート', '불러오기'],
  _清除: ['清除', '清除', 'Clear', 'クリア', '비우기'],
  _提示2: ['提示', '提示', 'Tip', '？', '팁'],
  _管理设置: [
    '管理<span class="key">设置</span>',
    '管理<span class="key">設定</span>',
    'Manage <span class="key">settings</span>',
    '<span class="key">設定</span>の管理',
    '<span class="key">설정</span> 관리',
  ],
  _导出设置: [
    '导出设置',
    '匯出設定',
    'Export settings',
    '設定をエクスポート',
    '내보내기',
  ],
  _导入设置: [
    '导入设置',
    '匯入設定',
    'Import settings',
    '設定をインポート',
    '불러오기',
  ],
  _重置设置: [
    '重置设置',
    '重設設定',
    'Reset settings',
    '設定をリセット',
    '설정 초기화',
  ],
  _自动检测: ['自动检测', '自動偵測', 'Auto', '自動検出', '자동'],
  _显示高级设置: [
    '显示<span class="key">高级</span>设置',
    '顯示<span class="key">進階</span>設定',
    'Show <span class="key">advanced</span> settings',
    '詳細設定を表示する',
    '<span class="key">고급</span> 설정 보기',
  ],
  _显示高级设置说明: [
    '被隐藏的设置仍然会发挥作用',
    '被隱藏的設定仍然會發揮作用',
    'Hidden settings will still work',
    '隠していた設定がそのまま機能する',
    '숨겨진 설정은 계속 작동합니다.',
  ],
  _下载完成后显示通知: [
    '下载完成后显示<span class="key">通知</span>',
    '下載完成後顯示<span class="key">通知</span>',
    'Show <span class="key">notification</span> after download is complete',
    'ダウンロードが完了した後に通知を表示する',
    '다운로드가 완료되면 <span class="key">알림</span> 표시',
  ],
  _下载完成后显示通知的说明: [
    '当所有文件下载完成后显示一条系统通知。可能会请求通知权限。',
    '當所有檔案下載完成後顯示一條系統通知。可能會請求通知許可權。',
    'Show a system notification when all files have been downloaded. May require notification permission.',
    'すべてのファイルのダウンロードが完了したらシステム通知を表示します。通知の許可が必要になる場合があります。',
    '모든 파일이 다운로드되면 시스템 알림을 표시합니다. 알림 권한이 필요할 수 있습니다.',
  ],
  _下载完毕2: [
    '下载完毕',
    '下載完畢',
    'Download complete',
    'ダウンロードが完了しました',
    '다운로드 완료',
  ],
  _在序号前面填充0: [
    '在序号前面<span class="key">填充 0</span>',
    '在序號前面<span class="key">填充 0</span>',
    '<span class="key">Add 0</span> in front of the serial number',
    'シリアル番号の前に 0 を記入',
    '일련번호 앞 <span class="key">0 채우기</span>',
  ],
  _在序号前面填充0的说明: [
    '这可以解决一些软件不能正确的按照文件名来排序文件的问题。',
    '這可以解決一些軟體不能正確的按照檔名來排序檔案的問題。',
    'This can solve the problem that some software cannot correctly sort files by file name.',
    'これにより、一部のソフトウェアがファイルをファイル名で正しくソートできないという問題を解決できます。',
    '이것은 일부 소프트웨어가 파일 이름별로 파일을 올바르게 정렬할 수 없는 문제를 해결할 수 있습니다.',
  ],
  _序号总长度: [
    '序号总长度',
    '序號總長度',
    'Total length of serial number',
    'シリアル番号の全長',
    '일련번호 전체 길이',
  ],
  _不下载重复文件: [
    '不下载<span class="key">重复</span>文件',
    '不下載<span class="key">重複</span>檔案',
    'Don`t download <span class="key">duplicate</span> files',
    '重複するファイルをダウンロードしない',
    '<span class="key">중복</span>파일 다운로드하지 않기',
  ],
  _不下载重复文件的提示: [
    `下载器会保存自己的下载记录。每个下载成功（保存到硬盘）的文件都会保存一条下载记录。下载失败的文件不会产生下载记录。<br>
    如果你启用了“不下载重复文件”功能，那么下载器会在下载每一个文件前检查下载记录，如果它是重复文件，下载器就会跳过它（不下载它）。<br>
    <br>
    补充说明：<br>
    - 这不是一个可靠的功能。下载器没有权限读取硬盘上的文件，所以只能依赖自己保存的下载记录。如果你把下载过的文件删除了，下载器是不会知道的，依然会认为文件下载过，从而跳过下载。如果有时你确实需要重新下载，可以关闭此功能。<br>
    - 下载器的下载记录保存在浏览器的 IndexedDB 里。它不是浏览器的下载记录，所以清除浏览器的下载记录不会影响此功能。额外提一句，如果浏览器的下载记录太多，会导致浏览器在启动时卡住一段时间。如果你遇到了此问题，应该清除浏览器的下载记录。<br>
    - 注意：清除浏览器的数据时，清除“Cookie 及其他网站数据”会导致下载器的下载记录被清空！如果你要清理此项，可以提前导出下载记录，以避免丢失下载记录。<br>
    - 如果你使用多个设备或浏览器，可以点击“导出”按钮导出下载器的下载记录，然后在新的设备上导入。<br>
    - 如果你想清空下载器的下载记录，可以点击此设置右边的“清除”按钮。<br>
    `,
    `下載器會儲存自己的下載記錄。每個下載成功（儲存到硬碟）的檔案都會儲存一條下載記錄。下載失敗的檔案不會產生下載記錄。<br>
    如果你啟用了“不下載重複檔案”功能，那麼下載器會在下載每一個檔案前檢查下載記錄，如果它是重複檔案，下載器就會跳過它（不下載它）。<br>
    <br>
    補充說明：<br>
    - 這不是一個可靠的功能。下載器沒有許可權讀取硬碟上的檔案，所以只能依賴自己儲存的下載記錄。如果你把下載過的檔案刪除了，下載器是不會知道的，依然會認為檔案下載過，從而跳過下載。如果有時你確實需要重新下載，可以關閉此功能。<br>
    - 下載器的下載記錄儲存在瀏覽器的 IndexedDB 裡。它不是瀏覽器的下載記錄，所以清除瀏覽器的下載記錄不會影響此功能。額外提一句，如果瀏覽器的下載記錄太多，會導致瀏覽器在啟動時卡住一段時間。如果你遇到了此問題，應該清除瀏覽器的下載記錄。<br>
    - 注意：清除瀏覽器的資料時，清除“Cookie 及其他網站資料”會導致下載器的下載記錄被清空！如果你要清理此項，可以提前匯出下載記錄，以避免丟失下載記錄。<br>
    - 如果你使用多個裝置或瀏覽器，可以點選“匯出”按鈕匯出下載器的下載記錄，然後在新的裝置上匯入。<br>
    - 如果你想清空下載器的下載記錄，可以點選此設定右邊的“清除”按鈕。<br>
    `,
    `This downloader will save its own download history. Each file that is successfully downloaded (saved to disk) will have a download record saved. Files that fail to download will not have a download record. <br>
If you enable the "Do not download duplicate files" feature, the downloader will check the download record before downloading each file. If it is a duplicate file, the downloader will skip it (not download it). <br>
<br>
Additional notes: <br>
- This is not a reliable feature. The downloader does not have permission to read files on the disk, so it can only rely on its own saved download records. If you delete a downloaded file, the downloader will not know and will still think that the file has been downloaded and skip the download. If you do need to re-download sometimes, you can turn this feature off. <br>
- The download history of the Downloader is saved in the browser's IndexedDB. It is not the browser's download history, so clearing the browser's download history will not affect this feature. As an extra note, if the browser has too many download history, it will cause the browser to get stuck for a while when it starts. If you encounter this problem, you should clear the browser's download history. <br>
- Note: When clearing the browser's data, clearing "Cookies and other website data" will cause the Downloader's download history to be cleared! If you want to clear this item, you can export the download history in advance to avoid losing the download history. <br>
- If you use multiple devices or browsers, you can click the "Export" button to export the Downloader's download history, and then import it on a new device. <br>
- If you want to clear the Downloader's download history, you can click the "Clear" button to the right of this setting. <br>
`,
    `このダウンローダーは独自のダウンロード履歴を保存します。正常にダウンロード（ディスクに保存）されたファイルにはダウンロード記録が保存されます。ダウンロードに失敗したファイルにはダウンロード記録は保存されません。<br>
「重複ファイルをダウンロードしない」機能を有効にすると、ダウンローダーは各ファイルをダウンロードする前にダウンロード記録を確認します。重複ファイルの場合は、ダウンローダーはそのファイルをスキップ（ダウンロードしない）します。<br>
<br>
補足事項：<br>
- これは信頼できる機能ではありません。ダウンローダーはディスク上のファイルを読み取る権限がないため、保存されたダウンロード記録のみに依存します。ダウンロード済みのファイルを削除しても、ダウンローダーはそれを認識できず、ファイルがダウンロード済みであると認識してダウンロードをスキップします。再ダウンロードが必要な場合は、この機能をオフにすることができます。<br>
- ダウンローダーのダウンロード履歴はブラウザのIndexedDBに保存されます。これはブラウザのダウンロード履歴ではないため、ブラウザのダウンロード履歴を消去してもこの機能には影響しません。なお、ブラウザにダウンロード履歴が多すぎると、起動時にしばらくフリーズすることがあります。この問題が発生した場合は、ブラウザのダウンロード履歴を消去することをお勧めします。<br>
- 注：ブラウザのデータを消去する際に、「Cookieとその他のウェブサイトデータ」を消去すると、ダウンローダーのダウンロード履歴も消去されます。この項目を消去する場合は、ダウンロード履歴の損失を防ぐために、事前にダウンロード履歴をエクスポートしておくことをお勧めします。 <br>
- 複数のデバイスやブラウザを使用している場合は、「エクスポート」ボタンをクリックしてダウンローダーのダウンロード履歴をエクスポートし、新しいデバイスにインポートすることができます。<br>
- ダウンローダーのダウンロード履歴を消去したい場合は、この設定の右側にある「クリア」ボタンをクリックしてください。<br>
`,
    `이 다운로더는 자체 다운로드 기록을 저장합니다. 성공적으로 다운로드된(디스크에 저장된) 각 파일에는 다운로드 기록이 저장됩니다. 다운로드에 실패한 파일에는 다운로드 기록이 없습니다. <br>
"중복 파일 다운로드 안 함" 기능을 활성화하면 다운로더는 각 파일을 다운로드하기 전에 다운로드 기록을 확인합니다. 중복 파일인 경우, 다운로더는 해당 파일을 건너뜁니다(다운로드하지 않습니다). <br>
<br>
추가 참고 사항: <br>
- 이 기능은 신뢰할 수 없습니다. 다운로더는 디스크에 있는 파일을 읽을 권한이 없으므로 자체 저장된 다운로드 기록에만 의존합니다. 다운로드한 파일을 삭제하면 다운로더는 해당 파일이 다운로드된 것으로 인식하지 못하고 다운로드를 건너뜁니다. 다시 다운로드해야 하는 경우 이 기능을 끌 수 있습니다. <br>
- 다운로더의 다운로드 기록은 브라우저의 IndexedDB에 저장됩니다. 브라우저의 다운로드 기록이 아니므로 브라우저의 다운로드 기록을 삭제해도 이 기능에는 영향을 미치지 않습니다. 참고로, 브라우저에 다운로드 기록이 너무 많으면 브라우저가 시작 시 잠시 멈춥니다. 이 문제가 발생하면 브라우저의 다운로드 기록을 삭제해야 합니다. <br>
- 참고: 브라우저 데이터를 삭제할 때 "쿠키 및 기타 웹사이트 데이터"를 삭제하면 다운로더의 다운로드 기록이 삭제됩니다! 이 항목을 삭제하려면 다운로드 기록을 미리 내보내어 다운로드 기록이 손실되는 것을 방지할 수 있습니다. <br>
- 여러 기기 또는 브라우저를 사용하는 경우, "내보내기" 버튼을 클릭하여 다운로더의 다운로드 기록을 내보낸 후 새 기기로 가져올 수 있습니다. <br>
- 다운로더의 다운로드 기록을 지우려면 이 설정 오른쪽에 있는 "지우기" 버튼을 클릭하세요. <br>
`,
  ],
  _清除下载记录: [
    '清除下载记录',
    '清除下載紀錄',
    'Clear download record',
    '履歴をクリア',
    '다운로드 기록 비우기',
  ],
  _下载记录已清除: [
    '下载记录已清除',
    '已清除下載紀錄',
    'Download record has been cleared',
    'ダウンロード履歴がクリアされました',
    '다운로드 기록이 비워졌습니다',
  ],
  _跳过下载因为重复文件: [
    '检测到文件 {} 已经下载过，跳过此次下载',
    '偵測到檔案 {} 已經下載過，跳過此次下載。',
    'Skip downloading duplicate files {}',
    '重複ファイル {} をスキップ',
    '파일 {}이(가) 이미 다운로드되어 있어, 다운로드를 건너뜁니다',
  ],
  _导入下载记录: [
    '导入下载记录',
    '匯入下載紀錄',
    'Import download record',
    'ダウンロード記録をインポート',
    '다운로드 기록 불러오기',
  ],
  _完成: ['完成', '完成', 'Completed', '完了', '완료됨'],
  _HowToUse: [
    '点击页面右侧的蓝色按钮可以打开下载器面板。<br><br>下载的文件保存在浏览器的下载目录里。<br><br>建议您在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。<br><br><strong>下载器不能绕过付费限制。</strong>',
    '點選頁面右側的藍色按鈕可以開啟下載器面板。<br><br>下載的檔案儲存在瀏覽器的下載目錄裡。<br><br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><br><strong>下載器不能繞過付費限制。</strong>',
    'Click the blue button on the right side of the page to open the downloader panel.<br><br>The downloaded file is saved in the browser`s download directory. <br><br>It is recommended to turn off "Ask where to save each file before downloading" in the browser`s download settings.<br><br><strong>Downloaders cannot bypass paid restrictions.</strong>',
    'ページ右側の青いボタンをクリックすると、ダウンローダーパネルが開きます。<br><br>ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><br>ブラウザのダウンロード設定で 「 ダウンロード前に各ファイルの保存場所を確認する 」 をオフにすることをお勧めします。<br><br><strong>ダウンローダーは、有料の制限を回避できません。</strong>',
    '페이지 오른쪽에 있는 파란색 버튼을 클릭하면 다운로드 패널이 열립니다.<br><br>다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다.<br><br>브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치 확인"을 끄는 것이 좋습니다.<br><br><strong>다운로더는 유료 제한을 우회할 수 없습니다.</strong>',
  ],
  _whatisnew: [
    `代码重构，并添加了新的功能。例如：`,
    `程式碼重構，並添加了新的功能。例如：`,
    `Code refactored and new features added. E.g:`,
    `コードのリファクタリングと新機能の追加。 例えば：`,
    `코드가 리팩터링되고 새로운 기능이 추가되었습니다. 예:`,
  ],
  _开始下载: [
    '开始下载',
    '開始下載',
    'Start download',
    '開始',
    '다운로드 시작',
  ],
  _暂停下载: [
    '暂停下载',
    '暫停下載',
    'Pause download',
    '一時停止',
    '다운로드 일시중지',
  ],
  _停止下载: ['停止下载', '停止下載', 'Stop download', '停止', '다운로드 정지'],
  _复制url: [
    '复制 URL',
    '複製下載網址',
    'Copy URLs',
    'URL をコピー',
    'URL 복사',
  ],
  _下载进度: [
    '下载进度',
    '下載進度',
    'Total progress',
    '概要',
    '다운로드 진행률',
  ],
  _数据清除完毕: [
    '数据清除完毕',
    '資料清除完畢',
    'Data cleared',
    'クリアされたデータ',
    '데이터가 비워졌습니다',
  ],
  _已跳过n个文件: [
    '已跳过 {} 个文件',
    '已跳過 {} 個檔案',
    '{} files skipped',
    '{} つのファイルをスキップしました',
    '{}개의 파일을 건너뛰었습니다',
  ],
  _统一网址格式: [
    '统一<span class="key">网址</span>格式',
    '統一<span class="key">網址</span>格式',
    'Unified <span class="key">URL</span> Format',
    '統一 <span class="key">URL</span> 形式',
    '통합 <span class="key">URL</span> 형식',
  ],
  _统一网址格式的说明: [
    '保持用户名在域名之后，例如：https://www.fanbox.cc/@username',
    '保持使用者名稱在域名後面，例如：https://www.fanbox.cc/@username',
    'Keep the username after the domain name, for example: https://www.fanbox.cc/@username',
    'ユーザー名はドメイン名の後にあります。例: https://www.fanbox.cc/@username',
    '도메인 이름 뒤에 사용자 이름을 유지합니다. 예를 들면 다음과 같습니다. https://www.fanbox.cc/@username',
  ],
  _正在保存抓取结果: [
    '正在保存抓取结果',
    '正在儲存擷取結果',
    'Saving crawl results',
    'クロール結果を保存しています',
    '긁어오기 결과 저장 중',
  ],
  _已保存抓取结果: [
    '已保存抓取结果',
    '已儲存擷取結果',
    'Crawl results saved',
    'クロール結果を保存しました',
    '긁어오기 결과가 저장되었습니다',
  ],
  _正在恢复抓取结果: [
    '正在恢复抓取结果',
    '正在還原擷取結果',
    'Restoring crawl results',
    'クロール結果を再開しています',
    '긁어오기 결과 복구 중',
  ],
  _已恢复抓取结果: [
    '已恢复抓取结果',
    '已還原擷取結果',
    'Crawl results resumed',
    'クロール結果を再開しました',
    '긁어오기 결과가 복구되었습니다',
  ],
  _清空已保存的抓取结果: [
    '清空已保存的抓取结果',
    '清除已儲存的擷取結果',
    'Clear saved crawl results',
    'セーブしたクロール結果をクリアします',
    '저장된 긁어오기 결과 비우기',
  ],
  _恢复未完成的下载任务: [
    '恢复未完成的下载任务',
    '恢復未完成的下載任務',
    'Resume unfinished download tasks',
    '未完了のダウンロード タスクを再開する',
    '완료되지 않은 다운로드 작업 재개',
  ],
  _价格限制: ['价格限制', '價格限制', `Price limit`, '価格制限', '가격 제한'],
  _因为价格限制不能抓取投稿: [
    '因为价格限制，无法抓取投稿：',
    '因為價格限制，無法抓取投稿：',
    `Can't crawl post due to price limit: `,
    '価格制限のため投稿をクロールできません: ',
    '가격 제한으로 인해 게시물을 크롤링할 수 없음: ',
  ],
  _因为价格限制而跳过的投稿数量: [
    '因为价格限制而跳过的投稿数量：',
    '因為價格限制而跳過的投稿數量：',
    'Number of posts skipped due to price limit: ',
    '価格制限によりスキップされた投稿の数: ',
    '가격 제한으로 인해 건너뛴 게시물 수: ',
  ],
  _即使遇到价格限制也可以保存封面图: [
    '即使遇到价格限制，也可以保存封面图',
    '即使遇到價格限制，也可以儲存封面圖',
    '即使有价格限制，也可以保存封面图片',
    '価格制限があっても表紙画像を保存',
    '가격 제한이 있어도 표지 이미지 저장',
  ],
  _投稿标题必须含有文字: [
    '投稿<span class="key">标题</span>必须含有文字',
    '投稿<span class="key">標題</span>必須含有文字',
    'Post <span class="key">title</span> must contain text',
    '投稿のタイトルにはテキストを含める必要があります',
    '게시물 제목에는 텍스트가 포함되어야 합니다',
  ],
  _投稿标题不能含有文字: [
    '投稿<span class="key">标题</span>不能含有文字',
    '投稿<span class="key">標題</span>不能含有文字',
    'Post <span class="key">title</span> cannot contain text',
    '投稿のタイトルにテキストを含めることはできません',
    '게시물 제목은 텍스트를 포함할 수 없습니다',
  ],
  _文件名中必须含有文字: [
    '<span class="key">文件名</span>中必须含有文字',
    '<span class="key">檔名</span>中必須含有文字',
    '<span class="key">File names</span> must contain text',
    'ファイル名に次の文字列を含める',
    '파일 이름에는 다음이 포함되어야 합니다',
  ],
  _文件名中不能含有文字: [
    '<span class="key">文件名</span>中不能含有文字',
    '<span class="key">檔名</span>中不能含有文字',
    '<span class="key">File names</span> cannot contain text',
    'ファイル名に次の文字列を含めない',
    '파일 이름에는 다음을 포함할 수 없습니다',
  ],
  _文件指的是附件: [
    '此处的文件指作者上传的附件（会显示文件名的那些），通常是压缩文件、视频、音频。',
    '此處的檔案指作者上傳的附件（會顯示檔名的那些），通常是壓縮檔案、影片、音訊。',
    'The file here refers to the attachment uploaded by the author (the file name will be displayed), usually a compressed file, video, or audio.',
    'ここでのファイルとは、作成者がアップロードした添付ファイル (ファイル名が表示されます) を指し、通常は圧縮ファイル、ビデオ、またはオーディオです。',
    '여기서 파일이란 작성자가 업로드한 첨부파일(파일명이 표시됩니다.)을 의미하며 일반적으로 압축된 파일, 비디오, 오디오 등입니다.',
  ],
  _多条文字用逗号分割: [
    '你可以设置多条文字，不区分大小写；每条之间用半角逗号(,)分割',
    '你可以設定多條文字，不區分大小寫；每條之間用半形逗號(,)分割',
    'You can set multiple texts, not case sensitive, and separate each with a comma (,)',
    '複数のテキストを設定でき、大文字と小文字を区別しない、それぞれをカンマ (,) で区切ります',
    '대소문자를 구분하지 않고 여러 텍스트를 설정할 수 있으며 각각을 쉼표(,)로 구분할 수 있습니다.',
  ],
  _日期时间格式错误: [
    '日期时间格式错误',
    '日期時間格式錯誤',
    'wrong datetime format',
    '間違った日時形式',
    '잘못된 날짜/시간 형식',
  ],
  _跳过文章因为: [
    '跳过 {} 因为：',
    '跳過 {} 因為：',
    'Skip {} because: ',
    '{} をスキップする理由: ',
    '다음과 같은 이유로 {}를 건너뜁니다.',
  ],
  _优化性能和用户体验: [
    '优化性能和用户体验。',
    '最佳化效能和使用者體驗。',
    'Optimize performance and user experience.',
    'パフォーマンスとユーザー エクスペリエンスを最適化します。',
    '성능과 사용자 경험을 최적화합니다.',
  ],
  _修复bug: ['修复 bug', '修復 bug', 'fix bugs', 'バグを修正', '버그 수정'],
  _不支持的浏览器: [
    '你的浏览器不能正常使用这个扩展程序，主要原因可能是浏览器内核版本太低，或者存在兼容性问题。<br>建议您更换成最新版本的 Chrome 或 Edge 浏览器。',
    '你的瀏覽器不能正常使用這個擴充套件程式，主要原因可能是瀏覽器核心版本太低，或者存在相容性問題。<br>建議您更換成最新版本的 Chrome 或 Edge 瀏覽器。',
    'Your browser cannot use this extension properly. The main reason may be that the browser kernel version is too low, or there is a compatibility problem. <br>We recommend that you switch to the latest version of Chrome or Edge.',
    'お使いのブラウザでは、この拡張機能を正しく使用できません。 主な理由としては、ブラウザのカーネル バージョンが低すぎるか、互換性の問題がある可能性があります。 <br>最新バージョンの Chrome または Edge に切り替えることをお勧めします。',
    '브라우저에서 이 확장 프로그램을 제대로 사용할 수 없습니다. 주된 이유는 브라우저 커널 버전이 너무 낮거나 호환성 문제가 있기 때문일 수 있습니다. <br>최신 버전의 Chrome 또는 Edge로 전환하는 것이 좋습니다.',
  ],
  _新增设置项: [
    '新增设置项',
    '新增設定項目',
    'Added setting items',
    '新たな機能を追加されました',
    '새로운 설정 항목 추가',
  ],
  _新增功能: ['新增功能', '新增功能', 'New feature', '新機能', '새로운 기능'],
  _增加了一些提示: [
    '增加了一些提示',
    '增加了一些提示',
    'Added some tips',
    'いくつかのヒントを追加しました',
    '몇 가지 팁을 추가했습니다.',
  ],
  _user_canceled_tip: [
    `{} 未保存，code：{}。`,
    `{} 未儲存，code：{}。`,
    `{} not saved, code: {}.`,
    `{} 保存されていません。code：{}。`,
    `{} 저장되지 않음, 코드: {}.`,
  ],
  _yandex浏览器的警告: [
    `如果你在 Yandex 浏览器（Android）上使用 Pixiv Fanbox Downloader，请换成 Kiwi 浏览器。<br>
    因为下载器在最近将会升级到 Manifest version 3，但是 Yandex 浏览器不支持  Manifest version 3， 所以它不能使用新版本的下载器。`,
    `如果你在 Yandex 瀏覽器（Android）上使用 Pixiv Fanbox Downloader，請換成 Kiwi 瀏覽器。<br>
    因為下載器在最近將會升級到 Manifest version 3，但是 Yandex 瀏覽器不支援  Manifest version 3， 所以它不能使用新版本的下載器。`,
    `If you are using Pixiv Fanbox Downloader on Yandex browser（Android）, please switch to Kiwi browser. <br>
    Because the downloader will be upgraded to Manifest version 3 in the near future, but Yandex browser does not support Manifest version 3, so it cannot use the new version of the downloader.`,
    `Yandex（Android） ブ Pixiv Fanbox Downloader を使用している場合は、Kiwi ブラウザに切り替えてください。 <br>
    ダウンローダは近いうちにマニフェスト バージョン 3 にアップグレードされますが、Yandex ブラウザはマニフェスト バージョン 3 をサポートしていないため、新しいバージョンのダウンローダを使用することはできません。`,
    `Yandex Browser(Android)에서 Pixiv Fanbox Downloader를 사용하는 경우 Kiwi 브라우저로 전환하십시오. <br>
    다운로더는 가까운 시일 내에 Manifest 버전 3으로 업그레이드되지만 Yandex 브라우저는 Manifest 버전 3을 지원하지 않으므로 새 버전의 다운로더를 사용할 수 없습니다.`,
  ],
  _新增命名标记: [
    '新增命名标记',
    '新增命名標記',
    'Add named tag',
    '名前付きタグを追加',
    '명명된 태그 추가',
  ],
  _升级到manifest_v3的提示: [
    '下载器已升级到 Manifest V3。<br>如果你在下载时遇到问题，请打开扩展管理页面，重新加载本扩展。',
    '下載器已升級到 Manifest V3。<br>如果你在下載時遇到問題，請開啟擴充套件管理頁面，重新載入本擴充套件。',
    'Downloader has been upgraded to Manifest V3. <br>If you encounter problems when downloading, please open the extension management page and reload this extension.',
    'Downloader が Manifest V3 にアップグレードされました。 <br>ダウンロード中に問題が発生した場合は、拡張機能の管理ページを開いて、この拡張機能をリロードしてください。',
    '다운로더가 Manifest V3로 업그레이드되었습니다. <br>다운로드 시 문제가 발생하면 확장 프로그램 관리 페이지를 열고 이 확장 프로그램을 새로고침하세요.',
  ],
  _图片的命名规则: [
    '图片的<span class="key">命名规则</span>',
    '圖片的<span class="key">命名規則</span>',
    '<span class="key">Naming rule</span> for image files',
    '画像ファイルの<span class="key">命名規則</span>',
    '이미지 파일의 명명 규칙',
  ],
  _非图片的命名规则: [
    '<span class="key">非图片</span>的命名规则',
    '<span class="key">非圖片</span>的命名規則',
    'Naming rule for <span class="key">non-image files</span>',
    '<span class="key">画像以外</span>のファイルの命名規則',
    '이미지가 아닌 파일의 이름 지정 규칙',
  ],
  _新增非图片命名规则的说明: [
    `现在你可以为图片文件和非图片文件设置独立的命名规则。<br>
    另外，非图片文件的默认名字改为它们的原文件名，而不是序号。`,
    `現在你可以為圖片檔案和非圖片檔案設定獨立的命名規則。<br>
    另外，非圖片檔案的預設名字改為它們的原檔名，而不是序號。`,
    `Now you can set separate naming rules for image files and non-image files. <br>
    Also, the default names of non-image files have been changed to their original filenames instead of serial numbers.`,
    `画像ファイルと非画像ファイルに別々の命名規則を設定できるようになりました。 <br>
    また、画像以外のファイルのデフォルト名は、シリアル番号ではなく元のファイル名に変更されています。`,
    `이제 이미지 파일과 이미지가 아닌 파일에 대해 별도의 이름 지정 규칙을 설정할 수 있습니다. <br>
    또한 이미지가 아닌 파일의 기본 이름이 일련 번호 대신 원래 파일 이름으로 변경되었습니다.`,
  ],
  _修复已知问题: [
    '修复已知问题',
    '修復已知問題',
    'fix known issues',
    '既知の問題を修正する',
    '알려진 문제 수정',
  ],
  _修复因为API数据变化导致抓取失败的问题: [
    '修复因为 API 数据变化导致抓取失败的问题。',
    '修復因為 API 資料變化導致抓取失敗的問題。',
    'Fix crawl failure due to API data changes.',
    'APIデータの変更によるクロールの失敗を修正しました。',
    'API 데이터 변경으로 인한 크롤링 실패를 수정합니다.',
  ],
  _任一: ['任一', '任一', 'One', '何れか', '하나만'],
  _提示有外链保存到txt: [
    '这次的抓取结果里有一些外部链接，下载器会把它们保存到 TXT 文件里，请手动处理。',
    '這次的抓取結果裡有一些外部連結，下載器會把它們儲存到 TXT 檔案裡，請手動處理。',
    'There are some external links in the crawling results this time. The downloader will save them into TXT files. Please handle them manually.',
    '今回のクロール結果には外部リンクがいくつか含まれます。ダウンローダーはそれらをTXTファイルに保存します。手動で処理してください。',
    '이번에는 크롤링 결과에 외부 링크가 몇 개 있습니다. 다운로더가 이를 TXT 파일로 저장합니다. 수동으로 처리해 주세요.',
  ],
  _下载器会等待几分钟然后再继续抓取: [
    '下载器会等待几分钟，然后再继续抓取。',
    '下載器會等待幾分鐘，然後再繼續擷取。',
    'The downloader will wait a few minutes before continuing to crawl.',
    'ダウンローダーは数分間待機してから、クロールを続行します。',
    '다운로더가 몇 분 기다린 후 크롤링을 계속합니다.',
  ],
  _下载器会减慢抓取速度以免被限制: [
    '下载器会减慢抓取速度，以避免被 Fanbox 限制抓取。',
    '下載器會減慢擷取速度，以避免被 Fanbox 限制擷取。',
    'The downloader will slow down the crawling speed to avoid being restricted by Fanbox.',
    'ダウンローダーは、Fanboxによるクロール制限を避けるために、クロール速度を落とします。',
    '다운로더는 Fanbox에 의해 크롤링이 제한되는 것을 피하기 위해 크롤링 속도를 늦춥니다.',
  ],
  _抓取间隔: [
    '抓取<span class="key">间隔</span>',
    '擷取<span class="key">間隔</span>',
    'Crawl <span class="key">interval</span>',
    'クロール<span class="key">間隔</span>',
    '크롤링 <span class="key">간격</span>',
  ],
  _抓取间隔的说明: [
    `抓取投稿时，每个请求之间的间隔时间，单位是秒。<br>
这是为了降低下载器发送请求的频率（特别是大量抓取时），从而减少账号被封的可能性。<br>
你可以修改此设置，最小值是 0（即无限制）。<br>`,
    `抓取投稿時，每個請求之間的間隔時間，單位是秒。<br>
這是為了降低下載器傳送請求的頻率（特別是大量抓取時），從而減少賬號被封的可能性。<br>
你可以修改此設定，最小值是 0（即無限制）。<br>`,
    `The time interval between each request when crawling posts, in seconds. <br>
This is intended to reduce the frequency of requests sent by the downloader (especially when crawling large volumes), thereby reducing the likelihood of your account being blocked. <br>
You can modify this setting; the minimum value is 0 (no limit). <br>`,
    `投稿をクロールする際の各リクエスト間の時間間隔（秒単位）。<br>
これは、ダウンローダーから送信されるリクエストの頻度を減らすことを目的としています（特に大量の投稿をクロールする場合）。これにより、アカウントがブロックされる可能性が低減されます。<br>
この設定は変更できます。最小値は 0（制限なし）です。<br>`,
    `게시물을 크롤링할 때 각 요청 사이의 시간 간격(초)입니다. <br>
이 설정은 다운로더가 보내는 요청 빈도를 줄이기 위한 것입니다(특히 대용량 게시물을 크롤링할 때). 따라서 계정이 차단될 가능성이 줄어듭니다. <br>
이 설정은 수정할 수 있으며, 최소값은 0(제한 없음)입니다. <br>`,
  ],
  _下载间隔: [
    '下载<span class="key">间隔</span>',
    '下載<span class="key">間隔</span>',
    'Download <span class="key">interval</span>',
    'ダウンロード<span class="key">間隔</span>',
    '다운로드 <span class="key">간격</span>',
  ],
  _秒: ['秒', '秒', 'seconds', '秒', '초'],
  _间隔时间: [
    '间隔时间：',
    '間隔時間：',
    'Interval time:',
    'インターバル時間：',
    '간격 시간:',
    'Интервал времени:',
  ],
  _下载间隔的说明: [
    `每隔一定时间开始一次下载，单位是秒。<br>
默认值为 1，即每小时最多会从 Fanbox 下载 3600 个文件。<br>
这是为了降低从 Fanbox 下载文件的频率（特别是下载体积较小的图片时），从而减少账号被封的可能性。<br>
你可以修改此设置，最小值是 0（即无限制）。<br>`,
    `每隔一定時間開始一次下載，單位是秒。<br>
預設值為 1，即每小時最多會從 Fanbox 下載 3600 個檔案。<br>
這是為了降低從 Fanbox 下載檔案的頻率（特別是下載體積較小的圖片時），從而減少賬號被封的可能性。<br>
你可以修改此設定，最小值是 0（即無限制）。<br>`,
    `The interval at which downloads are initiated, measured in seconds. <br>
The default value is 1, meaning a maximum of 3,600 files will be downloaded from Fanbox per hour. <br>
This is intended to reduce the frequency of downloads from Fanbox (especially when downloading small images), thereby reducing the likelihood of your account being blocked. <br>
You can modify this setting; the minimum value is 0 (no limit). <br>`,
    `ダウンロードを開始する間隔（秒単位）。<br>
デフォルト値は1で、Fanboxから1時間あたり最大3,600個のファイルがダウンロードされます。<br>
これは、Fanboxからのダウンロード頻度（特に小さな画像をダウンロードする場合）を減らし、アカウントがブロックされる可能性を減らすことを目的としています。<br>
この設定は変更できます。最小値は0（制限なし）です。<br>`,
    `다운로드 시작 간격(초)입니다. <br>
기본값은 1이며, Fanbox에서 시간당 최대 3,600개의 파일이 다운로드됩니다. <br>
이 설정은 Fanbox에서 다운로드 빈도(특히 작은 이미지 다운로드 시)를 줄여 계정이 차단될 가능성을 줄이기 위한 것입니다. <br>
이 설정은 수정할 수 있으며, 최소값은 0(제한 없음)입니다. <br>`,
  ],
  _已有抓取结果时进行提醒: [
    '这个标签页里已经有抓取结果了，重新开始抓取会清空这些抓取结果。\n请确认是否要重新开始抓取？',
    '這個標籤頁裡已經有抓取結果了，重新開始抓取會清空這些抓取結果。\n請確認是否要重新開始抓取？',
    'There are already crawl results on this tab. Restarting the crawl will clear these crawl results. \nPlease confirm that you want to restart the crawl?',
    'このタブにはすでにクロール結果があります。クロールを再開すると、これらのクロール結果は消去されます。 \nクロールを再開するかどうかを確認してください?',
    '이 탭에는 이미 크롤링 결과가 있습니다. 크롤링을 다시 시작하면 크롤링 결과가 지워집니다. \n크롤링을 다시 시작할 것인지 확인해주세요.',
  ],
  _账户可能被封禁的警告: [
    `<strong>警告</strong>：频繁和大量的抓取、下载可能会导致你的账号被封禁。<br>
下载器默认会减慢抓取和下载的速度。但如果你的账户依然被封禁，下载器不会承担任何责任。<br>
当你需要下载很多文件时，建议设置比较大的下载间隔时间。<br><br>`,
    `<strong>警告</strong>：頻繁和大量的抓取、下載可能會導致你的賬號被封禁。<br>
下載器預設會減慢抓取和下載的速度。但如果你的賬戶依然被封禁，下載器不會承擔任何責任。<br>
當你需要下載很多檔案時，建議設定比較大的下載間隔時間。<br><br>`,
    `<strong>Warning</strong>: Frequent and heavy downloading and scraping may result in your account being banned. <br>
Downloader will slow down the download and scraping speeds by default. However, if your account is still banned, Downloadloader will not be held responsible. <br>
If you need to download a lot of files, it is recommended to set a longer download interval. <br>`,
    `<strong>警告</strong>: 頻繁かつ大量のダウンロードやスクレイピングを行うと、アカウントが停止される可能性があります。<br>
Downloader はデフォルトでダウンロードとスクレイピングの速度を低下させます。それでもアカウントが停止された場合、Downloadloader は責任を負いません。<br>
大量のファイルをダウンロードする必要がある場合は、ダウンロード間隔を長めに設定することをお勧めします。<br>`,
    `<strong>경고</strong>: 잦은 다운로드 및 스크래핑은 계정 정지로 이어질 수 있습니다. <br>
Downloader는 기본적으로 다운로드 및 스크래핑 속도를 늦춥니다. 하지만 계정 정지가 해제되지 않은 경우에도 Downloadloader는 책임을 지지 않습니다. <br>
많은 파일을 다운로드해야 하는 경우, 다운로드 간격을 더 길게 설정하는 것이 좋습니다. <br>`,
  ],
  _移动端浏览器可能不会建立文件夹的说明: [
    `如果你使用的是移动端的浏览器，它可能不会建立文件夹。这不是下载器的问题。<br>如果你遇到了这种情况，需要修改命名规则以避免文件名重复。一个简单的方法是把默认命名规则里的 '/' 修改成 '-'。`,
    `如果你使用的是移動端的瀏覽器，它可能不會建立資料夾。這不是下載器的問題。<br>如果你遇到了這種情況，需要修改命名規則以避免檔名重複。一個簡單的方法是把預設命名規則裡的 '/' 修改成 '-'。`,
    `If you are using a mobile browser, it may not create a folder. This is not a problem with the downloader. If this happens, you need to modify the naming rules to avoid duplicate file names. A simple way to do this is to change the '/' in the default naming rules to '-'.`,
    `モバイルブラウザをご利用の場合、フォルダが作成されない場合があります。これはダウンローダーの問題ではありません。このような場合は、ファイル名の重複を避けるために命名規則を変更する必要があります。簡単な方法としては、デフォルトの命名規則の「/」を「-」に変更することです。`,
    `모바일 브라우저를 사용하는 경우 폴더가 생성되지 않을 수 있습니다. 이는 다운로더 문제가 아닙니다. 이 경우 파일 이름 중복을 방지하기 위해 파일 이름 지정 규칙을 수정해야 합니다. 간단한 방법은 기본 파일 이름 지정 규칙에서 '/'를 '-'로 변경하는 것입니다.`,
  ],
  _请求失败下载器会重试这个请求: [
    `请求失败。下载器会重试这个请求，无须手动处理。`,
    `請求失敗。下載器會重試這個請求，無須手動處理。`,
    `The request failed. The downloader will retry the request, no manual processing is required.`,
    `リクエストが失敗しました。ダウンローダーがリクエストを再試行するため、手動処理は必要ありません。`,
    `요청이 실패했습니다. 다운로더가 요청을 다시 시도하며, 수동 처리는 필요하지 않습니다.`,
  ],
}

export { langText }
