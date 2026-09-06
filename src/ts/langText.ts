// 储存下载器使用的多语言文本
// 每个 key 的值是数组，里面有 6 条文本，按照固定的顺序排列：简体中文、繁体中文、英语、日语、韩语、俄语
// 备注：
// 属性名前面需要添加下划线
// {} 是占位符
// <br> 和 \n 是换行
// 字符串使用模板字符串的反引号 ` 包裹（而非单引号 ' 或双引号 "），这样对于换行和特殊字符的处理会更方便
export type LangTextKey = keyof typeof langText

export const langText = {
  _开始抓取: [
    `开始抓取`,
    `開始抓取`,
    `Start crawling`,
    `クロールを開始する`,
    `크롤링 시작`,
    `Начать сканирование`,
  ],
  _抓取结果为零: [
    `抓取完毕，但是没有找到符合筛选条件的文件。通常这是因为投稿或文件不符合某些筛选条件的要求。你可以在顶部日志里查看详细信息。`,
    `抓取完畢，但是沒有找到符合篩選條件的檔案。通常是因為投稿或檔案不符合某些篩選條件的要求。你可以在頂部日誌中查看詳細資訊。`,
    `Crawling is complete, but no files matching the filter criteria were found. This is usually because the post or its files don't meet one or more of the filter conditions you set. You can check the log at the top for details.`,
    `クロールが完了しましたが、条件に一致するファイルが見つかりませんでした。通常は、投稿やファイルが設定したフィルター条件を満たしていないことが原因です。詳細は上部のログで確認できます。`,
    `크롤링이 완료되었지만 필터 조건에 맞는 파일을 찾지 못했습니다. 일반적으로 게시물이나 파일이 설정한 필터 조건 중 하나 이상을 충족하지 못했기 때문입니다. 자세한 내용은 상단 로그에서 확인할 수 있습니다.`,
    `Сканирование завершено, но файлы, соответствующие условиям фильтра, не найдены. Обычно это означает, что публикация или файлы не соответствуют одному или нескольким заданным условиям фильтра. Подробности можно посмотреть в журнале в верхней части страницы.`,
  ],
  _当前任务尚未完成2: [
    `当前任务尚未完成，请等待完成后再下载。`,
    `目前任務尚未完成，請等待完成後再下載。`,
    `The current task is not finished yet. Please wait for it to finish before downloading.`,
    `現在のタスクはまだ完了していません。完了するまでお待ちください。`,
    `현재 작업이 아직 완료되지 않았습니다. 완료될 때까지 기다린 후 다운로드해 주세요.`,
    `Текущая задача ещё не завершена. Пожалуйста, дождитесь её завершения, прежде чем загружать.`,
  ],
  _关闭: [`关闭`, `關閉`, `Close`, `閉じる`, `닫기`, `Закрыть`],
  _输出信息: [
    `输出信息`,
    `輸出資訊`,
    `Output log`,
    `出力ログ`,
    `출력 로그`,
    `Журнал вывода`,
  ],
  _复制: [`复制`, `複製`, `Copy`, `コピー`, `복사`, `Копировать`],
  _已复制到剪贴板: [
    `已复制到剪贴板，可直接粘贴`,
    `已複製到剪貼簿，可直接貼上`,
    `Copied to the clipboard. You can paste it directly.`,
    `クリップボードにコピーしました。そのまま貼り付けられます。`,
    `클립보드에 복사되었습니다. 바로 붙여넣을 수 있습니다.`,
    `Скопировано в буфер обмена. Можно сразу вставить.`,
  ],
  _github: [
    `GitHub 页面，欢迎 star`,
    `GitHub 頁面，歡迎 Star`,
    `GitHub page. If you like it, please give it a star!`,
    `GitHub のページです。気に入っていただけたらスターを付けていただけると嬉しいです。`,
    `GitHub 페이지입니다. 마음에 드신다면 Star를 눌러 주세요.`,
    `Это страница проекта на GitHub. Поставьте звезду, если он вам нравится!`,
  ],
  _pixivDownloader: [
    `Pixiv 下载器`,
    `Pixiv 下載器`,
    `Pixiv Downloader`,
    `Pixiv ダウンローダー`,
    `Pixiv 다운로더`,
    `Загрузчик Pixiv`,
  ],
  _其他: [`其他`, `其他`, `Other`, `その他`, `기타`, `Другое`],
  _设置文件夹名的提示: [
    `可以使用 <span class="key">/</span> 建立文件夹。示例：`,
    `可以使用 <span class="key">/</span> 建立資料夾。範例：`,
    `You can use <span class="key">/</span> to create folders. Example:`,
    `<span class="key">/</span> を使ってフォルダーを作成できます。例：`,
    `<span class="key">/</span>을 사용하여 폴더를 만들 수 있습니다. 예:`,
    `Для создания папок можно использовать <span class="key">/</span>. Пример:`,
  ],
  _命名标记user: [
    `创作者的名字`,
    `創作者的名字`,
    `Creator's name`,
    `クリエイターの名前`,
    `크리에이터의 이름`,
    `Имя создателя`,
  ],
  _命名标记creator_id: [
    `创作者的 ID。通常是创作者的英文名或罗马音名字。当你进入某个创作者的页面之后，可以在地址栏里看到这个 ID。`,
    `創作者的 ID。通常是創作者的英文名或羅馬拼音的名字。當你進入某個創作者的頁面之後，可以在網址列中看到這個 ID。`,
    `The creator's ID. It is usually the creator's English name or romanized name. After you visit a creator's page, you can see this ID in the address bar.`,
    `クリエイターの ID です。通常はクリエイターの英語名またはローマ字表記の名前です。クリエイターのページを開くと、アドレスバーでこの ID を確認できます。`,
    `크리에이터의 ID입니다. 보통 크리에이터의 영문 이름 또는 로마자 표기 이름입니다. 크리에이터의 페이지에 들어가면 주소 표시줄에서 이 ID를 확인할 수 있습니다.`,
    `ID создателя. Обычно это английское имя создателя или имя в романизации. Когда вы заходите на страницу создателя, этот ID можно увидеть в адресной строке.`,
  ],
  _命名标记uid: [
    `创作者的用户 ID，是纯数字。通常是他的 Pixiv 用户 ID。`,
    `創作者的使用者 ID，是純數字。通常是他的 Pixiv 使用者 ID。`,
    `The creator's user ID, which is a purely numeric ID. It is usually the creator's Pixiv user ID.`,
    `クリエイターのユーザー ID で、数字のみで構成されています。通常はその Pixiv のユーザー ID です。`,
    `크리에이터의 사용자 ID로, 숫자로만 이루어져 있습니다. 보통 해당 크리에이터의 Pixiv 사용자 ID입니다.`,
    `ID пользователя создателя, состоящий только из цифр. Обычно это его ID пользователя Pixiv.`,
  ],
  _预览文件名: [
    `预览文件名`,
    `預覽檔案名稱`,
    `Preview file names`,
    `ファイル名のプレビュー`,
    `파일명 미리보기`,
    `Предпросмотр имён файлов`,
  ],
  _下载线程: [
    `同时下载<span class="key">数量</span>`,
    `同時下載<span class="key">數量</span>`,
    `Simultaneous download <span class="key">count</span>`,
    `同時ダウンロード<span class="key">数</span>`,
    `동시 다운로드 <span class="key">개수</span>`,
    `<span class="key">Количество</span> одновременных загрузок`,
  ],
  _线程数字: [
    `可以输入 1-3 之间的数字，设置同时下载的数量`,
    `可以輸入 1-3 之間的數字，設定同時下載的數量`,
    `Enter a number between 1 and 3 to set how many files to download at the same time.`,
    `1〜3 の数字を入力して、同時にダウンロードする数を設定できます。`,
    `1~3 사이의 숫자를 입력하여 동시에 다운로드할 파일 수를 설정할 수 있습니다.`,
    `Введите число от 1 до 3, чтобы задать количество файлов, загружаемых одновременно.`,
  ],
  _当前状态: [
    `当前状态 `,
    `目前狀態 `,
    `Current status `,
    `現在の状態 `,
    `현재 상태 `,
    `Текущий статус `,
  ],
  _未开始下载: [
    `未开始下载`,
    `尚未開始下載`,
    `Download not started yet`,
    `ダウンロードはまだ開始されていません`,
    `다운로드가 아직 시작되지 않았습니다`,
    `Загрузка ещё не началась`,
  ],
  _常见问题: [
    `常见问题`,
    `常見問題`,
    `FAQ`,
    `よくある質問`,
    `자주 묻는 질문`,
    `Часто задаваемые вопросы`,
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
    `下載器偵測到下載後的檔案名稱可能異常。如果檔案名稱是一串隨機的字母與數字，或沒有使用下載器設定中的命名規則，就表示發生了此問題。<br>
這不是下載器本身的問題，而是受到其他擴充功能的影響，導致下載器設定的檔案名稱遺失。<br>
遇到此問題時，可以參考下列處理方式：<br>
1. 建議：你可以建立一個新的瀏覽器本機使用者來使用這個下載器。在 Chrome 與 Edge 瀏覽器中，點擊瀏覽器右上角的頭像圖示，即可建立新的使用者設定檔（不需要登入 Google 或 Microsoft 帳號）。每個使用者都有獨立的瀏覽器視窗，因此你可以為新使用者安裝這個下載器，並且不要安裝其他擴充功能。當你需要下載 Pixiv 或 Fanbox 的檔案時，使用這個使用者來下載，就能避免受到其他擴充功能的影響。
<br>
2. 你可以找出造成此問題的擴充功能，並在使用本下載器時暫時停用它們。這類擴充功能通常具備下載檔案、管理下載的功能，例如：IDM Integration Module、Chrono 下載管理員、mage Downloade 等。如果你不確定是哪個擴充功能造成的，可以先停用所有擴充功能，再逐一啟用並使用下載器下載，這樣就能找出是哪個擴充功能導致了此問題。<br>
<br>
技術細節：<br>
有些擴充功能會監聽 chrome.downloads.onDeterminingFilename 事件，這很容易導致預先設定的檔案名稱遺失。<br>
假設本下載器為某個檔案設定了自訂檔案名稱：user/image.jpg。<br>
如果另一個擴充功能監聽 onDeterminingFilename 事件，瀏覽器會詢問它對檔案名稱的建議（使它有機會修改檔案名稱）。問題在於：此時瀏覽器傳遞的檔案名稱是預設值（也就是 URL 中最後一段路徑），而不是下載器設定的檔案名稱。<br>
因此下載器設定的檔案名稱會遺失，檔案名稱會變成 URL 中最後一段路徑。<br>`,
    `The downloader has detected that the downloaded file name may be wrong. If the file name is a random string of letters and numbers, or doesn't follow the naming rules in the downloader settings, this problem has occurred.<br>
This is not a problem with the downloader itself — it is caused by other extensions interfering, which makes the file name set by the downloader get lost.<br>
If you run into this problem, here are some ways to deal with it:<br>
1. Recommended: create a new local browser user (profile) to use this downloader. In Chrome and Edge, click the avatar icon in the top-right corner of the browser and create a new profile (you don't need to sign in to a Google or Microsoft account). Each user has their own browser window, so you can install this downloader for the new user and avoid installing other extensions. When you need to download files from Pixiv or Fanbox, download with this user to avoid interference from other extensions.
<br>
2. You can find out which extension is causing this problem and temporarily disable it while using this downloader. Such extensions usually provide download or download-managing features, e.g. IDM Integration Module, Chrono Download Manager, mage Downloade, etc. If you're not sure which one it is, disable all extensions first, then enable them one by one and try downloading again — this way you can find out which extension causes the problem.<br>
<br>
Technical details:<br>
Some extensions listen to the chrome.downloads.onDeterminingFilename event, which can easily cause the preset file name to be lost.<br>
Suppose this downloader sets a custom file name for a file: user/image.jpg.<br>
If another extension listens to the onDeterminingFilename event, the browser will ask it for a suggested file name (giving it a chance to change the file name). The problem is that at this point the browser passes the default file name (i.e. the last path segment of the URL), not the file name set by the downloader.<br>
As a result, the file name set by the downloader is lost and the file name becomes the last path segment of the URL.<br>`,
    `ダウンローダーは、ダウンロード後のファイル名が異常になっている可能性を検出しました。ファイル名がランダムな英数字の並びになっていたり、ダウンローダー設定の命名規則が適用されていない場合は、この問題が発生しています。<br>
これはダウンローダー自体の問題ではなく、他の拡張機能の影響で、ダウンローダーが設定したファイル名が失われているのです。<br>
この問題が発生した場合は、次のような対処方法を検討してください。<br>
1. 推奨：このダウンローダーを使うために、ブラウザのローカルユーザー（プロフィール）を新しく作成する方法です。Chrome や Edge では、ブラウザ右上のアバターアイコンをクリックして新しいプロフィールを作成できます（Google や Microsoft アカウントへのログインは不要です）。ユーザーごとにブラウザウィンドウが分かれるので、新しいユーザーにはこのダウンローダーだけをインストールし、他の拡張機能はインストールしないでください。Pixiv や Fanbox のファイルをダウンロードする際はこのユーザーを使えば、他の拡張機能の影響を避けられます。
<br>
2. 原因となっている拡張機能を特定し、このダウンローダーを使う間は一時的に無効にすることもできます。このような拡張機能は通常、ファイルのダウンロードやダウンロード管理の機能を持ちます。例：IDM Integration Module、Chrono Download Manager、mage Downloade など。どの拡張機能が原因かわからない場合は、すべての拡張機能を無効にしてから、1つずつ有効にしてダウンロードを試すことで、原因の拡張機能を特定できます。<br>
<br>
技術的な詳細：<br>
一部の拡張機能は chrome.downloads.onDeterminingFilename イベントを監視しており、これによって事前に設定したファイル名が失われることがよくあります。<br>
このダウンローダーがファイルにカスタムのファイル名（例：user/image.jpg）を設定したとします。<br>
別の拡張機能が onDeterminingFilename イベントを監視している場合、ブラウザーはその拡張機能にファイル名の提案を求めます（ファイル名を変更する機会が与えられます）。問題は、このときブラウザーが渡すファイル名はデフォルトのもの（URL の最後のパス部分）であり、ダウンローダーが設定したファイル名ではないことです。<br>
その結果、ダウンローダーが設定したファイル名は失われ、ファイル名は URL の最後のパス部分になってしまいます。<br>`,
    `다운로더가 다운로드 후 파일 이름이 잘못되었을 수 있음을 감지했습니다. 파일 이름이 무작위 영문과 숫자의 나열이거나 다운로더 설정의 명명 규칙이 적용되지 않은 경우, 이 문제가 발생한 것입니다.<br>
이것은 다운로더 자체의 문제가 아니라 다른 확장 프로그램의 영향으로 다운로더가 설정한 파일 이름이 유실된 것입니다.<br>
이 문제가 발생하면 다음과 같은 해결 방법을 고려해 보세요.<br>
1. 권장: 이 다운로더를 사용할 새 브라우저 로컬 사용자(프로필)를 만드세요. Chrome 및 Edge에서는 브라우저 오른쪽 위의 아바타 아이콘을 클릭하여 새 프로필을 만들 수 있습니다(Google 또는 Microsoft 계정에 로그인할 필요 없음). 사용자마다 브라우저 창이 분리되므로, 새 사용자에게는 이 다운로더만 설치하고 다른 확장 프로그램은 설치하지 마세요. Pixiv 또는 Fanbox의 파일을 다운로드할 때 이 사용자로 다운로드하면 다른 확장 프로그램의 영향을 피할 수 있습니다.
<br>
2. 문제를 일으키는 확장 프로그램을 찾아서, 이 다운로더를 사용하는 동안에는 해당 확장 프로그램을 임시로 비활성화할 수 있습니다. 이러한 확장 프로그램은 보통 파일 다운로드나 다운로드 관리 기능을 제공합니다(예: IDM Integration Module, Chrono Download Manager, mage Downloade 등). 어떤 확장 프로그램이 원인인지 확실하지 않다면 모든 확장 프로그램을 비활성화한 뒤 하나씩 활성화하면서 다운로드를 시도해 보면 원인을 찾을 수 있습니다.<br>
<br>
기술적 세부 사항:<br>
일부 확장 프로그램은 chrome.downloads.onDeterminingFilename 이벤트를 감시하며, 이로 인해 미리 설정된 파일 이름이 쉽게 유실될 수 있습니다.<br>
이 다운로더가 파일에 사용자 지정 파일 이름(예: user/image.jpg)을 설정했다고 가정해 보겠습니다.<br>
다른 확장 프로그램이 onDeterminingFilename 이벤트를 감시하면, 브라우저는 그 확장 프로그램에 파일 이름 제안을 요청합니다(파일 이름을 변경할 기회가 주어집니다). 문제는 이때 브라우저가 전달하는 파일 이름이 기본값(URL의 마지막 경로 부분)이며, 다운로더가 설정한 파일 이름이 아니라는 점입니다.<br>
그 결과 다운로더가 설정한 파일 이름은 유실되고, 파일 이름은 URL의 마지막 경로 부분이 됩니다.<br>`,
    `Загрузчик обнаружил, что имя файла после загрузки может быть некорректным. Если имя файла представляет собой случайный набор букв и цифр или не соответствует правилам названий из настроек загрузчика, значит, возникла эта проблема.<br>
Это проблема не самого загрузчика, а результат влияния других расширений, из-за которого заданное загрузчиком имя файла теряется.<br>
Если вы столкнулись с этой проблемой, можно попробовать следующие способы:<br>
1. Рекомендуемый способ: создайте нового локального пользователя браузера (профиль) для работы с этим загрузчиком. В Chrome и Edge нажмите на значок аватара в правом верхнем углу и создайте новый профиль (входить в аккаунт Google или Microsoft не нужно). У каждого пользователя собственное окно браузера, поэтому для нового пользователя можно установить только этот загрузчик и не ставить другие расширения. Когда нужно скачивать файлы с Pixiv или Fanbox, загружайте их под этим пользователем — так вы избежите влияния других расширений.
<br>
2. Можно найти расширение, вызывающее проблему, и временно отключать его во время работы загрузчика. Такие расширения обычно отвечают за скачивание файлов и управление загрузками, например: IDM Integration Module, Chrono Download Manager, mage Downloade и т. д. Если вы не знаете, какое именно расширение мешает, отключите все расширения, затем включайте их по одному и пробуйте загрузку — так вы определите виновника.<br>
<br>
Технические подробности:<br>
Некоторые расширения слушают событие chrome.downloads.onDeterminingFilename, из-за чего заранее заданное имя файла легко теряется.<br>
Предположим, загрузчик задал для файла собственное имя: user/image.jpg.<br>
Если другое расширение слушает событие onDeterminingFilename, браузер запрашивает у него предложение по имени файла (давая ему возможность изменить имя). Проблема в том, что в этот момент браузер передаёт имя файла по умолчанию — то есть последний сегмент пути из URL, — а не имя, заданное загрузчиком.<br>
В итоге заданное загрузчиком имя файла теряется, и имя файла становится последним сегментом пути из URL.<br>`,
  ],
  _正在下载中: [
    `正在下载中`,
    `正在下載中`,
    `Downloading`,
    `ダウンロード中`,
    `다운로드 중`,
    `Идёт загрузка`,
  ],
  _下载完毕: [
    `✓ 下载完毕!`,
    `✓ 下載完畢!`,
    `✓ Download complete!`,
    `✓ ダウンロード完了！`,
    `✓ 다운로드 완료!`,
    `✓ Загрузка завершена!`,
  ],
  _已暂停: [
    `下载已暂停`,
    `下載已暫停`,
    `Download paused`,
    `ダウンロードを一時停止しました`,
    `다운로드가 일시중지되었습니다`,
    `Загрузка приостановлена`,
  ],
  _已停止: [
    `下载已停止`,
    `下載已停止`,
    `Download stopped`,
    `ダウンロードを停止しました`,
    `다운로드가 중지되었습니다`,
    `Загрузка остановлена`,
  ],
  _抓取完毕: [
    `抓取完毕！`,
    `抓取完畢！`,
    `Crawl finished!`,
    `クロールが完了しました！`,
    `크롤링 완료!`,
    `Сканирование завершено!`,
  ],
  _自动开始下载: [
    `<span class="key">自动</span>开始下载`,
    `<span class="key">自動</span>開始下載`,
    `<span class="key">Automatically</span> start downloading`,
    `<span class="key">自動</span>でダウンロードを開始する`,
    `<span class="key">자동으로</span> 다운로드 시작하기`,
    `<span class="key">Автоматически</span> начинать загрузку`,
  ],
  _自动下载的提示: [
    `当“开始下载”状态可用时，自动开始下载，不需要点击下载按钮。`,
    `當「開始下載」狀態可用時，會自動開始下載，不需要點擊下載按鈕。`,
    `When the "Start download" status becomes available, downloading starts automatically — no need to click the download button.`,
    `「ダウンロードを開始」状態になると、ダウンロードボタンをクリックしなくても自動的にダウンロードが始まります。`,
    `"다운로드 시작" 상태가 되면 다운로드 버튼을 클릭하지 않아도 자동으로 다운로드가 시작됩니다.`,
    `Когда появится статус «Начать загрузку», загрузка начнётся автоматически — нажимать кнопку загрузки не нужно.`,
  ],
  _是否重置设置: [
    `是否重置设置？`,
    `是否重設設定？`,
    `Reset settings?`,
    `設定をリセットしますか？`,
    `설정을 초기화하시겠습니까?`,
    `Сбросить настройки?`,
  ],
  _id范围: [
    `<span class="key">ID</span> 范围`,
    `<span class="key">ID</span> 範圍`,
    `<span class="key">ID</span> range`,
    `<span class="key">ID</span>の範囲`,
    `<span class="key">ID</span> 범위`,
    `Диапазон <span class="key">ID</span>`,
  ],
  _设置id范围提示: [
    `您可以输入一个投稿 ID，抓取比它新或者比它旧的投稿`,
    `您可以輸入一個投稿 ID，擷取比它新或比它舊的投稿。`,
    `You can enter a post ID to crawl posts newer or older than it.`,
    `投稿 ID を入力すると、それより新しい投稿や古い投稿をクロールできます。`,
    `게시물 ID를 입력하면 그보다 최신이거나 오래된 게시물을 크롤링할 수 있습니다.`,
    `Вы можете ввести ID публикации, чтобы сканировать публикации новее или старее её.`,
  ],
  _大于: [`大于`, `大於`, `Greater than`, `より大きい`, `보다 큼`, `Больше`],
  _小于: [`小于`, `小於`, `Less than`, `より小さい`, `보다 작음`, `Меньше`],
  _投稿时间: [
    `投稿<span class="key">时间</span>`,
    `投稿<span class="key">時間</span>`,
    `Posting <span class="key">time</span>`,
    `投稿<span class="key">日時</span>`,
    `투고 <span class="key">시간</span>`,
    `<span class="key">Время</span> публикации`,
  ],
  _设置投稿时间提示: [
    `您可以下载指定时间内发布的投稿`,
    `您可以下載指定時間內發布的投稿。`,
    `You can download posts published within a specified time period.`,
    `指定した期間内に公開された投稿をダウンロードできます。`,
    `지정된 기간 내에 게시된 게시물을 다운로드할 수 있습니다.`,
    `Вы можете загружать публикации, опубликованные за указанный период времени.`,
  ],
  _没有数据可供使用: [
    `没有数据可供使用`,
    `沒有資料可供使用`,
    `No data available.`,
    `利用可能なデータがありません。`,
    `사용 가능한 데이터가 없습니다.`,
    `Нет доступных данных.`,
  ],
  _最小值: [
    `最小值`,
    `最小值`,
    `Minimum value`,
    `最小値`,
    `최소값`,
    `Минимальное значение`,
  ],
  _文件类型: [
    `<span class="key">文件</span>类型`,
    `<span class="key">檔案</span>類型`,
    `<span class="key">File</span> type`,
    `<span class="key">ファイル</span>タイプ`,
    `<span class="key">파일</span> 유형`,
    `<span class="key">Тип</span> файла`,
  ],
  _图片: [`图片`, `圖片`, `Image`, `画像`, `이미지`, `Изображение`],
  _视频: [`视频`, `影片`, `Video`, `動画`, `동영상`, `Видео`],
  _音乐: [`音频`, `音訊`, `Audio`, `音声`, `오디오`, `Аудио`],
  _压缩文件: [
    `压缩文件`,
    `壓缩檔`,
    `Compressed file`,
    `圧縮ファイル`,
    `압축 파일`,
    `Сжатый файл`,
  ],
  _PS文件: [
    `源文件`,
    `原始檔`,
    `Source file`,
    `ソースファイル`,
    `소스 파일`,
    `Исходный файл`,
  ],
  _费用类型: [
    `<span class="key">费用</span>类型`,
    `<span class="key">費用</span>型別`,
    `<span class="key">Fee</span> type`,
    `<span class="key">料金</span>タイプ`,
    `<span class="key">수수료</span> 유형`,
    `<span class="key">Тип</span> оплаты`,
  ],
  _免费投稿: [
    `免费投稿`,
    `免費投稿`,
    `Free post`,
    `無料投稿`,
    `무료 게시물`,
    `Бесплатная публикация`,
  ],
  _付费投稿: [
    `付费投稿`,
    `付費投稿`,
    `Paid post`,
    `有償投稿`,
    `유료 게시물`,
    `Платная публикация`,
  ],
  _价格范围: [
    `<span class="key">价格</span>范围`,
    `<span class="key">價格</span>範圍`,
    `<span class="key">Price</span> range`,
    `<span class="key">価格</span>帯`,
    `<span class="key">가격</span> 범위`,
    `<span class="key">Диапазон</span> цен`,
  ],
  _保存投稿中的外部链接: [
    `保存投稿中的外部<span class="key">链接</span>`,
    `儲存投稿中的外部<span class="key">連結</span>`,
    `Save external <span class="key">links</span> in the posts`,
    `投稿中の外部<span class="key">リンク</span>を保存`,
    `게시물의 외부 <span class="key">링크</span> 저장`,
    `Сохранить внешние <span class="key">ссылки</span> в публикациях`,
  ],
  _保存投稿中的文字: [
    `保存投稿中的<span class="key">文字</span>`,
    `儲存投稿中的<span class="key">文字</span>`,
    `Save the <span class="key">text</span> in the posts`,
    `投稿の<span class="key">本文</span>を保存`,
    `게시물의 <span class="key">텍스트</span> 저장`,
    `Сохранить <span class="key">текст</span> в публикациях`,
  ],
  _格式: [`格式：`, `格式：`, `Format:`, `形式：`, `형식:`, `Формат:`],
  _保存投稿中的文字的说明: [
    `你可以设置是否保存投稿的正文文本。<br><br>有两种格式可以选择：<br>1. TXT：由于 TXT 文件里只能保存纯文本，所以查看它时不会显示投稿里的图片、视频、超链接等内容。<br>2. HTML：查看时可以显示投稿里的图片、视频、超链接等内容，阅读体验更好。<br><br>另外，由于每篇投稿的外部链接、正文、评论都会保存到同一个文件里，所以这个设置里的格式就是这些内容的保存格式。<br>PS：如果你关闭了这个设置，那么外部链接和评论总是会保存到 TXT 文件里。`,
    `你可以設定是否儲存投稿的正文文字。<br><br>有兩種格式可以選擇：<br>1. TXT：由於 TXT 檔案只能儲存純文字，查看時不會顯示投稿中的圖片、影片、超連結等內容。<br>2. HTML：查看時可以顯示投稿中的圖片、影片、超連結等內容，閱讀體驗更好。<br><br>此外，由於每篇投稿的外部連結、正文、評論都會儲存在同一個檔案裡，所以此設定中的格式就是這些內容的儲存格式。<br>PS：如果你關閉了這個設定，外部連結和評論一律會儲存到 TXT 檔案裡。`,
    `You can choose whether to save the main text of posts.<br><br>There are two available formats:<br>1. TXT: Because TXT files can only contain plain text, images, videos, hyperlinks, and other content in the post will not be displayed when viewing them.<br>2. HTML: Images, videos, hyperlinks, and other content in the post can be displayed when viewing it, providing a better reading experience.<br><br>In addition, each post's external links, main text, and comments are saved in the same file, so this setting determines the format used to save all of that content.<br>PS: If you turn off this setting, external links and comments are always saved in a TXT file.`,
    `投稿の本文テキストを保存するかどうかを設定できます。<br><br>選択できる形式は2種類あります。<br>1. TXT：TXT ファイルにはプレーンテキストしか保存できないため、投稿内の画像、動画、ハイパーリンクなどは表示されません。<br>2. HTML：投稿内の画像、動画、ハイパーリンクなどを表示できるため、より快適に閲覧できます。<br><br>また、各投稿の外部リンク、本文、コメントは同じファイルに保存されるため、この設定の形式はこれらの内容の保存形式になります。<br>PS：この設定をオフにした場合、外部リンクとコメントは常に TXT ファイルに保存されます。`,
    `게시물의 본문 텍스트를 저장할지 설정할 수 있습니다.<br><br>선택할 수 있는 형식은 두 가지입니다.<br>1. TXT: TXT 파일에는 일반 텍스트만 저장할 수 있으므로 게시물의 이미지, 동영상, 하이퍼링크 등의 내용은 볼 때 표시되지 않습니다.<br>2. HTML: 게시물의 이미지, 동영상, 하이퍼링크 등의 내용을 표시할 수 있어 더 나은 읽기 경험을 제공합니다.<br><br>또한 각 게시물의 외부 링크, 본문, 댓글은 같은 파일에 저장되므로 이 설정의 형식이 이러한 내용의 저장 형식이 됩니다.<br>PS: 이 설정을 끄면 외부 링크와 댓글은 항상 TXT 파일에 저장됩니다.`,
    `Вы можете выбрать, сохранять ли основной текст публикаций.<br><br>Доступны два формата:<br>1. TXT: поскольку в TXT-файлах можно сохранить только обычный текст, изображения, видео, гиперссылки и другое содержимое публикации при просмотре не будут отображаться.<br>2. HTML: при просмотре могут отображаться изображения, видео, гиперссылки и другое содержимое публикации, что делает чтение удобнее.<br><br>Кроме того, внешние ссылки, основной текст и комментарии каждой публикации сохраняются в одном файле, поэтому этот параметр определяет формат сохранения всего этого содержимого.<br>PS: если отключить этот параметр, внешние ссылки и комментарии всегда будут сохраняться в TXT-файл.`,
  ],
  _保存投稿中的评论: [
    `保存投稿中的<span class="key">评论</span>`,
    `儲存投稿中的<span class="key">評論</span>`,
    `Save <span class="key">comments</span> in the posts`,
    `投稿の<span class="key">コメント</span>を保存`,
    `게시물의 <span class="key">댓글</span> 저장`,
    `Сохранить <span class="key">комментарии</span> в публикациях`,
  ],
  _HTML: [`HTML`, `HTML`, `HTML`, `HTML`, `HTML`, `HTML`],
  _评论: [`评论`, `評論`, `Comments`, `コメント`, `댓글`, `Комментарии`],
  _抓取文件数量: [
    `已获取 {} 个文件`,
    `已取得 {} 個檔案`,
    `Obtained {} files`,
    `{} 個のファイルを取得`,
    `{}개의 파일을 획득하였습니다`,
    `Получено {} файлов`,
  ],
  _抓取赞助的所有用户的投稿: [
    `抓取赞助的所有用户的投稿`,
    `擷取所有贊助使用者的投稿`,
    `Crawl posts from all sponsored users`,
    `支援中のすべてのユーザーの投稿をクロールする`,
    `후원 중인 모든 사용자의 게시물 크롤링`,
    `Собрать все публикации спонсируемых пользователей`,
  ],
  _没有赞助的用户: [
    `没有可用的数据，可能是因为你没有赞助的创作者。如果你认为是程序错误，请向作者反馈。`,
    `沒有可用的資料，可能是因為你沒有贊助的創作者。如果你認為是程式錯誤，請向作者反饋。`,
    `There is no available data, probably because you don't have a sponsored creator. If you think it's a program error, please give feedback to the author.`,
    `利用可能なデータがありません。おそらくスポンサークリエイターがいないためです。プログラミングのミスだと思われる場合は、作者にフィードバックしてください。`,
    `사용 가능한 데이터가 없습니다. 스폰서 크리에이터가 없기 때문일 수 있습니다. 프로그램 오류라고 생각되면 작성자에게 피드백을 보내주세요.`,
    `Нет доступных данных, вероятно, потому что у вас нет спонсируемых авторов. Если вы считаете, что это ошибка программы, пожалуйста, сообщите автору.`,
  ],
  _抓取关注的所有用户的投稿: [
    `抓取关注的所有用户的投稿`,
    `抓取關注的所有使用者的投稿`,
    `Crawl all posts of followed users`,
    `フォローしているユーザーのすべての投稿をクロールする`,
    `팔로우 중인 모든 사용자의 게시물을 크롤링합니다.`,
    `Собрать все публикации отслеживаемых пользователей`,
  ],
  _抓取关注的所有用户的投稿的提示: [
    `提示：关注的用户里不包含赞助的用户。\n\n如果你有多个关注的用户，抓取他们的所有投稿可能会产生大量的网络请求。你可以根据需要设置一些过滤条件，以避免产生不必要的抓取。例如设置“费用类型”、“投稿时间”等。\n\n是否立即开始抓取？`,
    `提示：關注的使用者裡不包含贊助的使用者。\n\n如果你有多個關注的使用者，擷取他們的所有投稿可能會產生大量的網路請求。你可以根據需要設定一些過濾條件，以避免產生不必要的擷取。例如設定"費用類型"、"投稿時間"等。\n\n是否立即開始擷取？`,
    `Tip: Followed users do not include sponsored users. \n\nIf you have multiple followed users, crawling all their posts may generate a large number of network requests. You can set some filtering conditions as needed to avoid unnecessary crawling. For example, set "fee type", "posting time", etc. \n\nDo you want to start crawling now?`,
    `ヒント：フォローしているユーザーにはスポンサーユーザーは含まれません。\n\nフォローしているユーザーが複数いる場合、そのすべての投稿をクロールすると、大量のネットワークリクエストが発生する可能性があります。不要なクロールを回避するために、必要に応じてフィルタリング条件を設定できます。たとえば、「料金タイプ」、「投稿時間」などを設定します。\n\n今すぐクロールを開始しますか？`,
    `팁：팔로우된 사용자에는 스폰서 사용자가 포함되지 않습니다. \n\n팔로우된 사용자가 여러 명인 경우, 모든 게시물을 크롤링하면 많은 네트워크 요청이 발생할 수 있습니다. 불필요한 크롤링을 피하기 위해 필요에 따라 필터링 조건을 설정할 수 있습니다. 예를 들어, "수수료 유형", "게시 시간" 등을 설정하세요. \n\n지금 크롤링을 시작하시겠습니까?`,
    `Подсказка: отслеживаемые пользователи не включают спонсируемых пользователей.\n\nЕсли вы отслеживаете нескольких пользователей, сканирование всех их публикаций может привести к большому количеству сетевых запросов. При необходимости вы можете установить фильтры, чтобы избежать ненужного сканирования. Например, установите «тип оплаты», «время публикации» и т.д.\n\nНачать сканирование сейчас?`,
  ],
  _正在关注的创作者: [
    `正在关注的创作者`,
    `關注中的創作者`,
    `Followed creators`,
    `フォロー中のクリエイター`,
    `팔로우 중인 크리에이터`,
    `Отслеживаемые создатели`,
  ],
  _没有找到关注的用户: [
    `没有找到关注的用户`,
    `沒有找到關注的使用者`,
    `No followed users found`,
    `フォローしているユーザーが見つかりません`,
    `팔로우 중인 사용자를 찾을 수 없습니다`,
    `Отслеживаемые пользователи не найдены`,
  ],
  _抓取该用户的投稿: [
    `抓取该用户的投稿`,
    `擷取該使用者的投稿`,
    `Crawl this user's posts`,
    `このユーザーの投稿をクロール`,
    `이 크리에이터의 게시물 크롤링`,
    `Сканировать публикации этого пользователя`,
  ],
  _抓取该tag的投稿: [
    `抓取该 tag 的投稿`,
    `擷取該 tag 的投稿`,
    `Crawl posts with this tag`,
    `このタグの投稿をクロール`,
    `이 태그의 게시물 크롤링`,
    `Сканировать публикации с этим тегом`,
  ],
  _抓取这篇投稿: [
    `抓取这篇投稿`,
    `擷取這篇投稿`,
    `Crawl this post`,
    `この投稿をクロール`,
    `이 게시물을 크롤링`,
    `Сканировать эту публикацию`,
  ],
  _抓取商品的封面图: [
    `抓取商品的封面图`,
    `擷取商品的封面圖`,
    `Crawl the cover image of the product`,
    `商品の表紙画像をクロール`,
    `상품의 표지 이미지를 크롤링`,
    `Сканировать обложку товара`,
  ],
  _命名标记postid: [
    `投稿 ID`,
    `投稿 ID`,
    `Post ID`,
    `投稿ID`,
    `게시물 ID`,
    `ID публикации`,
  ],
  _命名标记title: [
    `投稿标题`,
    `投稿標題`,
    `Post title`,
    `投稿のタイトル`,
    `게시물 제목`,
    `Заголовок публикации`,
  ],
  _命名标记tags: [
    `投稿的 tag 列表（可能为空）`,
    `投稿的 tag 列表（可能為空）`,
    `Post's tag list (may be empty)`,
    `投稿のタグリスト（空の場合があります）`,
    `게시물의 태그 목록 (비어있을 수 있음)`,
    `Список тегов публикации (может быть пустым)`,
  ],
  _命名标记PVA: [
    `输出每篇投稿的资源标记。P、V、A 分别表示图片、视频、音频。完整输出如【15P1V1A】或[15P+1V+1A]（这取决于下载器的语言），每个投稿独立计算。根据投稿的实际情况，可能只会输出部分标记，或者不输出任何内容。它适合放在最后一层文件夹的末尾，例如：fanbox/{user}/{date}-{title}{PVA}/{name}`,
    `輸出每篇投稿的資源標記。P、V、A 分別表示圖片、影片、音訊。完整輸出如【15P1V1A】或[15P+1V+1A]（取決於下載器的語言），每個投稿獨立計算。根據投稿的實際情況，可能只會輸出部分標記，或者不輸出任何內容。它適合放在最後一層資料夾的末尾，例如：fanbox/{user}/{date}-{title}{PVA}/{name}`,
    `Outputs the resource tag for each post. P, V, and A stand for image, video, and audio respectively. A complete output looks like [15P+1V+1A] or 【15P1V1A】 (depending on the downloader's language), and is calculated independently for each post. Depending on the actual content of the post, only some of the tags may be output, or nothing at all. It is suitable for placing at the end of the last folder level, for example: fanbox/{user}/{date}-{title}{PVA}/{name}`,
    `各投稿のリソースタグを出力します。P、V、A はそれぞれ画像、動画、音声を表します。完全な出力は【15P1V1A】または[15P+1V+1A]のようになります（ダウンローダーの言語によって異なります）。各投稿ごとに独立して計算されます。投稿の実際の内容に応じて、一部のタグだけが出力されたり、何も出力されなかったりします。最後のフォルダの末尾に置くのに適しています。例：fanbox/{user}/{date}-{title}{PVA}/{name}`,
    `각 게시물의 리소스 태그를 출력합니다. P, V, A는 각각 이미지, 동영상, 오디오를 나타냅니다. 완전한 출력은 [15P+1V+1A] 또는 【15P1V1A】와 같습니다(다운로더의 언어에 따라 다릅니다). 각 게시물마다 독립적으로 계산됩니다. 게시물의 실제 내용에 따라 일부 태그만 출력되거나 아무것도 출력되지 않을 수 있습니다. 마지막 폴더의 끝에 배치하기에 적합합니다. 예: fanbox/{user}/{date}-{title}{PVA}/{name}`,
    `Выводит метку ресурсов для каждой публикации. P, V и A означают изображение, видео и аудио соответственно. Полный вывод выглядит как [15P+1V+1A] или 【15P1V1A】 (в зависимости от языка загрузчика) и рассчитывается независимо для каждой публикации. В зависимости от фактического содержания публикации могут выводиться только некоторые метки или ничего. Её удобно размещать в конце последней папки, например: fanbox/{user}/{date}-{title}{PVA}/{name}`,
  ],
  _命名标记date: [
    `投稿的发布日期，如 2019-08-29`,
    `投稿的發布日期，如 2019-08-29`,
    `The publication date of the post, such as 2019-08-29`,
    `投稿の公開日、例：2019-08-29`,
    `게시물의 게시일, 예: 2019-08-29`,
    `Дата публикации, например, 2019-08-29`,
  ],
  _命名标记fee: [
    `投稿的价格`,
    `投稿的價格`,
    `Post price`,
    `投稿の価格`,
    `게시물 가격`,
    `Цена публикации`,
  ],
  _命名标记index: [
    `文件在它所属的投稿里的序号`,
    `檔案在它所屬的投稿裡的序號`,
    `The serial number of the file in the post it belongs to`,
    `投稿内のファイルの連番`,
    `게시물의 파일 일련번호`,
    `Порядковый номер файла в публикации`,
  ],
  _命名标记name: [
    `文件在投稿里的文件名`,
    `檔案在投稿裡的名稱`,
    `File name in the post`,
    `投稿内のファイル名`,
    `게시물의 파일명`,
    `Имя файла в публикации`,
  ],
  _命名标记ext: [
    `文件的扩展名`,
    `檔案的副檔名`,
    `File extension`,
    `ファイルの拡張子`,
    `파일 확장자`,
    `Расширение файла`,
  ],
  _命名标记提醒: [
    `您可以使用多个标记；建议在不同标记之间添加分割用的字符。示例：{postid}-{title}<br>建议在命名规则中包含 {postid} 和 {index}，防止文件名重复。`,
    `您可以使用多個標記；建議在不同標記之間加入分隔用的字元。範例：{postid}-{title}<br>建議在命名規則中包含 {postid} 和 {index}，防止檔名重複。`,
    `You can use multiple markers; it is recommended to add separator characters between different markers. Example: {postid}-{title} <br>It is recommended to include {postid} and {index} in the naming rules to prevent duplicate file names.`,
    `複数のタグを使用できます。異なるタグを区切るために文字を追加することを推奨します。例：{postid}-{title} <br>ファイル名の重複を防ぐために、命名規則に{postid}と{index}を含めることを推奨します。`,
    `여러 태그를 사용할 수 있습니다. 서로 다른 태그 사이에 구분 문자를 추가하는 것이 좋습니다. 예: {postid}-{title} <br>파일명 중복을 방지하기 위해 명명 규칙에 {postid}와 {index}를 포함하는 것이 좋습니다.`,
    `Вы можете использовать несколько тегов; рекомендуется добавлять разделительные символы между тегами. Пример: {postid}-{title}<br>Рекомендуется включать {postid} и {index} в правила именования, чтобы избежать дублирования имен файлов.`,
  ],
  _日期格式: [
    `日期和时间<span class="key">格式</span>`,
    `日期和時間<span class="key">格式</span>`,
    `Date and time <span class="key">format</span>`,
    `日付と時刻の<span class="key">書式</span>`,
    `날짜 및 시간 <span class="key">형식</span>`,
    `даты и времени <span class="key">формат</span>`,
  ],
  _日期格式提示: [
    `你可以使用以下标记来设置日期和时间格式。这会影响命名规则里的 {date} 和 {task_date}。<br>对于时间如 2021-04-30T06:40:08`,
    `你可以使用以下標記來設定日期和時間格式。這會影響命名規則裡的 {date} 和 {task_date}。<br>對於時間如 2021-04-30T06:40:08`,
    `You can use the following markers to set the date and time format. This will affect {date} and {task_date} in the naming rules. <br>For time such as 2021-04-30T06:40:08`,
    `以下のタグを使用して日付と時刻の書式を設定できます。これは命名規則の{date}と{task_date}に影響します。<br>例：2021-04-30T06:40:08`,
    `다음 태그를 사용하여 날짜 및 시간 형식을 설정할 수 있습니다. 이는 명명 규칙의 {date}와 {task_date}에 영향을 미칩니다. <br>예: 2021-04-30T06:40:08`,
    `Вы можете использовать следующие теги для установки формата даты и времени. Это повлияет на {date} и {task_date} в правилах именования.<br>Для времени, например, 2021-04-30T06:40:08`,
  ],
  _命名标记taskDate: [
    `本次任务抓取完成时的时间。例如：2020-10-21`,
    `本次任務擷取完成時的時間。例如：2020-10-21`,
    `The time when the task was completed. For example: 2020-10-21`,
    `タスクを完了した日時。例：2020-10-21`,
    `작업 완료 날짜. 예: 2020-10-21`,
    `Время завершения задачи сканирования. Например: 2020-10-21`,
  ],
  _提示: [`提示`, `提示`, `Tip`, `ヒント`, `팁`, `Подсказка`],
  _保存投稿中的封面图片: [
    `保存投稿中的<span class="key">封面</span>图片`,
    `儲存投稿中的<span class="key">封面</span>圖片`,
    `Save the <span class="key">cover</span> image in the posts`,
    `投稿の<span class="key">表紙</span>画像を保存`,
    `게시물의 <span class="key">표지</span> 이미지 저장`,
    `Сохранить <span class="key">обложку</span> изображения в публикациях`,
  ],
  _列表页抓取完成: [
    `列表页面抓取完成`,
    `清單頁面擷取完成`,
    `The list page crawl is complete`,
    `リストページのクロールが完了しました`,
    `목록 페이지 크롤링이 완료되었습니다`,
    `Сканирование страницы списка завершено`,
  ],
  _当前有x个投稿: [
    `当前有 {} 个投稿 `,
    `目前有 {} 個投稿 `,
    `There are currently {} posts`,
    `現在 {} 件の投稿があります`,
    `현재 {}개의 게시물이 있습니다`,
    `Сейчас есть {} публикаций`,
  ],
  _开始获取投稿信息: [
    `开始获取投稿信息`,
    `開始取得投稿資訊`,
    `Start retrieving post information`,
    `投稿情報の取得を開始します`,
    `게시물 정보 가져오기를 시작합니다`,
    `Начать получение информации о публикации`,
  ],
  _待处理: [
    `待处理`,
    `待處理`,
    `Pending`,
    `処理待ち`,
    `처리 대기`,
    `В ожидании`,
  ],
  _最近更新: [
    `最近更新`,
    `最近更新`,
    `Recent updates`,
    `最近の更新`,
    `최근 업데이트`,
    `Последние обновления`,
  ],
  _我知道了: [
    `我知道了`,
    `我知道了`,
    `Got it`,
    `了解しました`,
    `알겠습니다`,
    `Понятно`,
  ],
  _格式错误: [
    `格式错误`,
    `格式錯誤`,
    `Format error`,
    `フォーマットエラー`,
    `형식 오류`,
    `Ошибка формата`,
  ],
  _导入成功: [
    `导入成功`,
    `匯入成功`,
    `Imported successfully`,
    `インポート成功`,
    `가져오기 성공`,
    `Успешный импорт`,
  ],
  _导出成功: [
    `导出成功`,
    `匯出成功`,
    `Exported successfully`,
    `エクスポート成功`,
    `내보내기 성공`,
    `Успешный экспорт`,
  ],
  _确定: [`确定`, `確定`, `Confirm`, `確定`, `확인`, `Подтвердить`],
  _时间范围: [
    `时间范围`,
    `時間範圍`,
    `Time range`,
    `時間範囲`,
    `시간 범위`,
    `Диапазон времени`,
  ],
  _背景图片: [
    `<span class="key">背景</span>图片`,
    `<span class="key">背景</span>圖片`,
    `<span class="key">Background</span> image`,
    `<span class="key">背景</span>画像`,
    `<span class="key">배경</span> 이미지`,
    `<span class="key">Фоновое</span> изображение`,
  ],
  _选择文件: [
    `选择文件`,
    `選擇檔案`,
    `Select a file`,
    `ファイルを選択`,
    `파일 선택`,
    `Выбрать файл`,
  ],
  _不透明度: [
    `不透明度`,
    `不透明度`,
    `Opacity`,
    `不透明度`,
    `투명도`,
    `Непрозрачность`,
  ],
  _对齐方式: [
    `对齐方式`,
    `對齊方式`,
    `Alignment`,
    `整列方法`,
    `정렬 방식`,
    `Выравнивание`,
  ],
  _顶部: [`顶部`, `頂部`, `Top`, `上揃え`, `상단`, `Верх`],
  _居中: [`居中`, `居中`, `Center`, `中央揃え`, `중앙`, `Центр`],
  _常见问题说明: [
    `下载器不能绕过付费限制。
    <br><br>
    下载的文件保存在浏览器的下载目录里。如果你想保存到其他位置，需要修改下载器的下载目录。
    <br><br>
    建议在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。
    <br><br>
    如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。
    <br><br>
    如果你的浏览器在启动时停止响应，可能是因为浏览器的下载记录太多了导致的。你可以尝试清除浏览器的下载记录。
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
    `下載器不能繞過付費限制。
<br><br>
下載的檔案儲存在瀏覽器的下載目錄裡。如果你想儲存到其他位置，需要修改下載器的下載目錄。
<br><br>
建議在瀏覽器的下載設定中關閉「下載前詢問每個檔案的儲存位置」。
<br><br>
如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。
<br><br>
如果你的瀏覽器在啟動時停止響應，可能是因為瀏覽器的下載記錄太多了導致的。你可以嘗試清除瀏覽器的下載記錄。
<br><br>
下載器 QQ 群：853021998
<br><br>
如果你需要一個機場（梯子）的話，可以試試我現在用的機場：魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>，性價比很高，9.9 元 768 GB 流量（倍率都是 1x），而且速度很快，下載國外網盤的檔案時可以跑滿我的頻寬（70 MB/s）。
<br>
如果上面的網址打不開，可以訪問地址發布頁：<a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
<br>
你也可以查看我寫的使用體驗：<a href="https://saber.love/?p=12736" title="魔法喵使用體驗" target="_blank">魔法喵使用體驗</a>
<br>
我的邀請碼：GYjQWDob
<br><br>
`,
    `The downloader cannot bypass paid restrictions.
<br><br>
Downloaded files are saved in the browser's download folder. If you want to save them elsewhere, you need to change the downloader's download folder.
<br><br>
It is recommended to turn off "Ask where to save each file before downloading" in your browser's download settings.
<br><br>
If the file names appear incorrect after downloading, disable other browser extensions that have download features.
<br><br>
If your browser stops responding when it starts up, it may be because the browser's download history is too large. You can try clearing the browser's download history.
<br><br>
Downloader QQ group: 853021998
<br><br>
If you need a proxy (VPN), you can try the one I'm currently using: Magic Cat <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>. It's very cost-effective: 9.9 yuan for 768 GB of traffic (all at 1x rate), and it's fast—when downloading files from foreign cloud storage, it can saturate my bandwidth (70 MB/s).
<br>
If the link above doesn't open, you can visit the mirror page: <a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
<br>
You can also read my review here: <a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">Magic Cat review</a>
<br>
My referral code: GYjQWDob
<br><br>
`,
    `ダウンローダーは有料制限を回避できません。
<br><br>
ダウンロードしたファイルはブラウザのダウンロードフォルダに保存されます。他の場所に保存したい場合は、ダウンローダーのダウンロードフォルダを変更する必要があります。
<br><br>
ブラウザのダウンロード設定で「ダウンロード前に各ファイルの保存場所を確認する」をオフにすることをお勧めします。
<br><br>
ダウンロード後のファイル名がおかしい場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。
<br><br>
ブラウザを起動時に応答しなくなった場合は、ブラウザのダウンロード履歴が多すぎることが原因かもしれません。ブラウザのダウンロード履歴を削除してみてください。
<br><br>
ダウンローダー QQ グループ：853021998
<br><br>
プロキシ（VPN）が必要な場合は、私が現在使っているものをお試しください：魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>。コストパフォーマンスが非常に高く、9.9 元で 768 GB の通信量（倍率はすべて 1x）で、速度も速いため、海外のクラウドストレージからファイルをダウンロードする際は私の帯域幅（70 MB/s）を最大まで使い切れます。
<br>
上記の URL が開かない場合は、アドレス公開ページをご覧ください：<a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
<br>
私が書いた使用感もご覧いただけます：<a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">魔法喵の使用感</a>
<br>
私の紹介コード：GYjQWDob
<br><br>
`,
    `다운로더는 유료 제한을 우회할 수 없습니다.
<br><br>
다운로드한 파일은 브라우저의 다운로드 폴더에 저장됩니다. 다른 위치에 저장하려면 다운로더의 다운로드 폴더를 변경해야 합니다.
<br><br>
브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치를 묻기"를 끄는 것을 권장합니다.
<br><br>
다운로드 후 파일 이름이 이상하다면, 다운로드 기능이 있는 다른 브라우저 확장 프로그램을 비활성화하세요.
<br><br>
브라우저를 시작할 때 응답하지 않는다면, 브라우저의 다운로드 기록이 너무 많기 때문일 수 있습니다. 브라우저의 다운로드 기록을 삭제해 보세요.
<br><br>
다운로더 QQ 그룹: 853021998
<br><br>
프록시(VPN)가 필요하다면, 제가 현재 사용하는 것을 추천합니다: 魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>. 가성비가 매우 높아 9.9위안에 768 GB 트래픽(배율 모두 1x)이며, 속도도 빨라 해외 클라우드에서 파일을 다운로드할 때 제 대역폭(70 MB/s)을 꽉 채울 수 있습니다.
<br>
위의 주소가 열리지 않으면 주소 공개 페이지를 방문하세요: <a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
<br>
제가 쓴 사용 후기도 보실 수 있습니다: <a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">魔法喵 사용 후기</a>
<br>
제 추천 코드: GYjQWDob
<br><br>
`,
    `Загрузчик не может обойти платные ограничения.
<br><br>
Загруженные файлы сохраняются в папке загрузок браузера. Если вы хотите сохранить их в другом месте, измените папку загрузки в настройках загрузчика.
<br><br>
Рекомендуется отключить в настройках загрузок браузера опцию «Спрашивать, куда сохранять каждый файл перед загрузкой».
<br><br>
Если после загрузки имена файлов отображаются некорректно, отключите другие расширения браузера с функциями загрузки.
<br><br>
Если браузер перестает отвечать при запуске, возможно, причина в слишком большом количестве записей о загрузках. Попробуйте очистить историю загрузок браузера.
<br><br>
Группа QQ загрузчика: 853021998
<br><br>
Если вам нужен прокси (VPN), попробуйте тот, которым пользуюсь сейчас я: 魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>. Очень выгодно: 9,9 юаня за 768 ГБ трафика (коэффициент везде 1x), и скорость высокая — при скачивании файлов с зарубежных облачных хранилищ он полностью использует мою пропускную способность (70 МБ/с).
<br>
Если ссылку выше не открыть, перейдите на страницу публикации адреса: <a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
<br>
Также вы можете прочитать мой отзыв: <a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">Отзыв о 魔法喵</a>
<br>
Мой реферальный код: GYjQWDob
<br><br>
`,
  ],
  _赞助我: [
    `赞助我`,
    `贊助我`,
    `Sponsor me`,
    `スポンサーになる`,
    `후원하기`,
    `Поддержать меня`,
  ],
  _赞助方式提示: [
    `如果您觉得这个工具对您有帮助，可以考虑赞助我，谢谢~<br>
    您可以在 Patreon 上赞助我：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
    中国大陆用户可以在“爱发电”上赞助我：<br>
    <a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
    也可以扫描二维码：<br>
    <a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">在 GitHub 上查看二维码</a>
    `,
    `如果您覺得這個工具對您有幫助，可以考慮贊助我，謝謝~<br>
您可以在 Patreon 上贊助我：<br>
<a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
中國大陸使用者可以在「愛發電」上贊助我：<br>
<a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
也可以掃描 QR 碼：<br>
<a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">在 GitHub 上查看 QR 碼</a>
`,
    `If you find this tool helpful, please consider sponsoring me. Thank you!<br>
You can sponsor me on Patreon:<br>
<a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
Users in mainland China can sponsor me on "Afdian":<br>
<a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
You can also scan the QR code:<br>
<a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">View the QR code on GitHub</a>
`,
    `このツールが役に立ったと思われる場合は、スポンサーになることをご検討ください。ありがとうございます。<br>
以下の Patreon でご支援いただけます：<br>
<a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
中国本土のユーザーは「愛発電（Afdian）」でご支援いただけます：<br>
<a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
QR コードをスキャンすることもできます：<br>
<a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">GitHub で QR コードを確認する</a>
`,
    `이 도구가 도움이 된다면 후원해 보시기 바랍니다. 감사합니다!<br>
Patreon에서 저를 후원해 주세요:<br>
<a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
중국 본토 사용자는 "아프디안(Afdian)"에서 후원하실 수 있습니다:<br>
<a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
QR 코드를 스캔할 수도 있습니다:<br>
<a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">GitHub에서 QR 코드 보기</a>
`,
    `Если вы считаете этот инструмент полезным, пожалуйста, рассмотрите возможность спонсировать меня. Спасибо!<br>
Вы можете спонсировать меня на Patreon:<br>
<a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
Пользователи из материкового Китая могут спонсировать меня через «Afdian»:<br>
<a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
Также можно отсканировать QR-код:<br>
<a href="https://github.com/xuejianxianzun/PixivBatchDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">Посмотреть QR-код на GitHub</a>
`,
  ],
  _隐藏下载面板: [
    `隐藏下载面板（Alt + X）`,
    `隱藏下載面板（Alt + X）`,
    `Hide the download panel (Alt + X)`,
    `ダウンロードパネルを非表示にする（Alt + X）`,
    `다운로드 패널 숨기기 (Alt + X)`,
    `Скрыть панель загрузки (Alt + X)`,
  ],
  _显示下载面板: [
    `显示下载面板 (Alt + X)`,
    `顯示下載面板 (Alt + X)`,
    `Show download panel (Alt + X)`,
    `ダウンロードパネルを表示 (Alt + X)`,
    `다운로드 패널 보이기 (Alt + X)`,
    `Показать панель загрузки (Alt + X)`,
  ],
  _输出内容太多已经为你保存到文件: [
    `因为输出内容太多，已经为您保存到文件。`,
    `因為輸出內容太多，已經為你儲存到檔案。`,
    `Because there is too much output, it has been saved to a file.`,
    `出力内容が多いため、ファイルに保存しました。`,
    `출력 내용이 너무 많아, 파일로 저장했습니다.`,
    `Из-за большого объема выходных данных они были сохранены в файл.`,
  ],
  _保存: [`保存`, `儲存`, `Save`, `保存`, `저장`, `Сохранить`],
  _加载: [`加载`, `載入`, `Load`, `ロード`, `불러오기`, `Загрузить`],
  _保存命名规则提示: [
    `保存命名规则，最多 20 个`,
    `儲存命名規則，最多 20 個`,
    `Save naming rule, up to 20`,
    `命名規則を保存します。最大 20 個まで`,
    `명명 규칙 저장, 최대 20개`,
    `Сохранить правила названий, до 20.`,
  ],
  _已保存命名规则: [
    `已保存命名规则`,
    `已儲存命名規則`,
    `Naming rule saved`,
    `命名規則を保存しました`,
    `명명 규칙이 저장되었습니다.`,
    `Правила названий сохранены`,
  ],
  _快速下载本页: [
    `快速下载本页作品 (Alt + Q)`,
    `快速下載本頁作品 (Alt + Q)`,
    `Download the works on this page quickly (Alt + Q)`,
    `このページの作品をすばやくダウンロードする (Alt + Q)`,
    `이 페이지의 작품 빠르게 다운로드 (Alt + Q)`,
    `Быстро скачать работы на этой странице (Alt + Q)`,
  ],
  _高亮显示关键字: [
    `<span class="key">高亮</span>显示关键字`,
    `<span class="key">標明</span>顯示關鍵字`,
    `<span class="key">Highlight</span> keywords`,
    `<span class="key">強調</span>表示キーワード`,
    `<span class="key">강조</span> 키워드 표시`,
    `<span class="key">Выделить</span> ключевые слова`,
  ],
  _导出: [
    `导出`,
    `匯出`,
    `Export`,
    `エクスポート`,
    `내보내기`,
    `Экспортировать`,
  ],
  _导入: [`导入`, `匯入`, `Import`, `インポート`, `불러오기`, `Импортировать`],
  _清除: [`清除`, `清除`, `Clear`, `クリア`, `비우기`, `Очистить`],
  _管理设置: [
    `管理<span class="key">设置</span>`,
    `管理<span class="key">設定</span>`,
    `Manage <span class="key">settings</span>`,
    `<span class="key">設定</span>の管理`,
    `<span class="key">설정</span> 관리`,
    `Управление <span class="key">настройками</span>`,
  ],
  _导出设置: [
    `导出设置`,
    `匯出設定`,
    `Export settings`,
    `設定をエクスポート`,
    `설정 내보내기`,
    `Экспорт настроек`,
  ],
  _导入设置: [
    `导入设置`,
    `匯入設定`,
    `Import settings`,
    `設定をインポート`,
    `설정 불러오기`,
    `Импорт настроек`,
  ],
  _重置设置: [
    `重置设置`,
    `重設設定`,
    `Reset settings`,
    `設定をリセット`,
    `설정 초기화`,
    `Сбросить настройки`,
  ],
  _自动检测: [
    `自动检测`,
    `自動偵測`,
    `Auto-detect`,
    `自動検出`,
    `자동`,
    `Автоопределение`,
  ],
  _显示高级设置: [
    `显示<span class="key">高级</span>设置`,
    `顯示<span class="key">進階</span>設定`,
    `Show <span class="key">advanced</span> settings`,
    `<span class="key">詳細</span>設定を表示する`,
    `<span class="key">고급</span> 설정 보기`,
    `Показать <span class="key">расширенные</span> настройки`,
  ],
  _显示高级设置说明: [
    `被隐藏的设置仍然会发挥作用`,
    `被隱藏的設定仍然會發揮作用`,
    `Hidden settings will still work`,
    `隠していた設定がそのまま機能する`,
    `숨겨진 설정은 계속 작동합니다.`,
    `Скрытые настройки все равно будут работать.`,
  ],
  _下载完成后显示通知: [
    `下载完成后显示<span class="key">通知</span>`,
    `下載完成後顯示<span class="key">通知</span>`,
    `Show <span class="key">notification</span> after download is complete`,
    `ダウンロードが完了した後に<span class="key">通知</span>を表示する`,
    `다운로드가 완료되면 <span class="key">알림</span> 표시`,
    `Показать <span class="key">уведомление</span> после завершения загрузки`,
  ],
  _下载完成后显示通知的说明: [
    `当所有文件下载完成后显示一条系统通知。可能会请求通知权限。`,
    `當所有檔案下載完成後顯示一條系統通知。可能會請求通知許可權。`,
    `Show a system notification when all files have been downloaded. May require notification permission.`,
    `すべてのファイルのダウンロードが完了したらシステム通知を表示します。通知の許可が必要になる場合があります。`,
    `모든 파일이 다운로드되면 시스템 알림을 표시합니다. 알림 권한이 필요할 수 있습니다.`,
    `После завершения загрузки всех файлов отображается системное уведомление. Может потребоваться разрешение на уведомления.`,
  ],
  _下载完毕2: [
    `下载完毕`,
    `下載完畢`,
    `Download complete`,
    `ダウンロードが完了しました`,
    `다운로드 완료`,
    `Загрузка завершена`,
  ],
  _在序号前面填充0: [
    `在序号前面<span class="key">填充 0</span>`,
    `在序號前面<span class="key">填充 0</span>`,
    `<span class="key">Pad with 0</span> in front of the serial number`,
    `シリアル番号の前に<span class="key">0</span>を記入`,
    `일련번호 앞 <span class="key">0 채우기</span>`,
    `Добавить <span class="key">0</span> перед порядковым номером`,
  ],
  _在序号前面填充0的说明: [
    `这可以解决一些软件不能正确的按照文件名来排序文件的问题。`,
    `這可以解決一些軟體不能正確的按照檔名來排序檔案的問題。`,
    `This can solve the problem that some software cannot correctly sort files by file name.`,
    `これにより、一部のソフトウェアがファイルをファイル名で正しくソートできないという問題を解決できます。`,
    `이것은 일부 소프트웨어가 파일 이름별로 파일을 올바르게 정렬할 수 없는 문제를 해결할 수 있습니다.`,
    `Это решает проблему, когда некоторые программы не могут правильно сортировать файлы по имени.`,
  ],
  _序号总长度: [
    `序号总长度`,
    `序號總長度`,
    `Total length of serial number`,
    `シリアル番号の全長`,
    `일련번호 전체 길이`,
    `Общая длина номера`,
  ],
  _不下载重复文件: [
    `不下载<span class="key">重复</span>文件`,
    `不下載<span class="key">重複</span>檔案`,
    `Don't download <span class="key">duplicate</span> files`,
    `<span class="key">重複</span>するファイルをダウンロードしない`,
    `<span class="key">중복</span>파일 다운로드하지 않기`,
    `Не загружать <span class="key">повторяющиеся</span> файлы`,
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
    如果你啟用了"不下載重複檔案"功能，那麼下載器會在下載每一個檔案前檢查下載記錄，如果它是重複檔案，下載器就會跳過它（不下載它）。<br>
    <br>
    補充說明：<br>
    - 這不是一個可靠的功能。下載器沒有許可權讀取硬碟上的檔案，所以只能依賴自己儲存的下載記錄。如果你把下載過的檔案刪除了，下載器是不會知道的，依然會認為檔案下載過，從而跳過下載。如果有時你確實需要重新下載，可以關閉此功能。<br>
    - 下載器的下載記錄儲存在瀏覽器的 IndexedDB 裡。它不是瀏覽器的下載記錄，所以清除瀏覽器的下載記錄不會影響此功能。額外提一句，如果瀏覽器的下載記錄太多，會導致瀏覽器在啟動時卡住一段時間。如果你遇到了此問題，應該清除瀏覽器的下載記錄。<br>
    - 注意：清除瀏覽器的資料時，清除"Cookie 及其他網站資料"會導致下載器的下載記錄被清空！如果你要清理此項，可以提前匯出下載記錄，以避免丟失下載記錄。<br>
    - 如果你使用多個裝置或瀏覽器，可以點選"匯出"按鈕匯出下載器的下載記錄，然後在新的裝置上匯入。<br>
    - 如果你想清空下載器的下載記錄，可以點選此設定右邊的"清除"按鈕。<br>
    `,
    `This downloader will save its own download record. Each file that is successfully downloaded (saved to disk) will have a download record saved. Files that fail to download will not have a download record. <br>
    If you enable the "Do not download duplicate files" feature, the downloader will check the download record before downloading each file. If it is a duplicate file, the downloader will skip it (not download it). <br>
    <br>
    Additional notes: <br>
    - This is not a reliable feature. The downloader does not have permission to read files on the disk, so it can only rely on its own saved download records. If you delete a downloaded file, the downloader will not know and will still think that the file has been downloaded and skip the download. If you do need to re-download sometimes, you can turn this feature off. <br>
    - The downloader's download record is saved in the browser's IndexedDB. It is not the browser's download history, so clearing the browser's download history will not affect this feature. As an extra note, if the browser has too many download history entries, it will cause the browser to get stuck for a while when it starts. If you encounter this problem, you should clear the browser's download history. <br>
    - Note: When clearing the browser's data, clearing "Cookies and other website data" will cause the downloader's download record to be cleared! If you want to clear this item, you can export the download record in advance to avoid losing the download record. <br>
    - If you use multiple devices or browsers, you can click the "Export" button to export the downloader's download record, and then import it on a new device. <br>
    - If you want to clear the downloader's download record, you can click the "Clear" button to the right of this setting. <br>
    `,
    `このダウンローダーは独自のダウンロード履歴を保存します。正常にダウンロード（ディスクに保存）されたファイルにはダウンロード記録が保存されます。ダウンロードに失敗したファイルにはダウンロード記録は保存されません。<br>
    「<span class="key">重複</span>するファイルをダウンロードしない」機能を有効にすると、ダウンローダーは各ファイルをダウンロードする前にダウンロード記録を確認します。重複ファイルの場合は、ダウンローダーはそのファイルをスキップ（ダウンロードしない）します。<br>
    <br>
    補足事項：<br>
    - これは信頼できる機能ではありません。ダウンローダーはディスク上のファイルを読み取る権限がないため、保存されたダウンロード記録のみに依存します。ダウンロード済みのファイルを削除しても、ダウンローダーはそれを認識できず、ファイルがダウンロード済みであると認識してダウンロードをスキップします。再ダウンロードが必要な場合は、この機能をオフにすることができます。<br>
    - ダウンローダーのダウンロード履歴はブラウザのIndexedDBに保存されます。これはブラウザのダウンロード履歴ではないため、ブラウザのダウンロード履歴を消去してもこの機能には影響しません。なお、ブラウザにダウンロード履歴が多すぎると、起動時にしばらくフリーズすることがあります。この問題が発生した場合は、ブラウザのダウンロード履歴を消去することをお勧めします。<br>
    - 注：ブラウザのデータを消去する際に、「Cookieとその他のウェブサイトデータ」を消去すると、ダウンローダーのダウンロード履歴も消去されます。この項目を消去する場合は、ダウンロード履歴の損失を防ぐために、事前にダウンロード履歴をエクスポートしておくことをお勧めします。 <br>
    - 複数のデバイスやブラウザを使用している場合は、「エクスポート」ボタンをクリックしてダウンローダーのダウンロード履歴をエクスポートし、新しいデバイスにインポートすることができます。<br>
    - ダウンローダーのダウンロード履歴を消去したい場合は、この設定の右側にある「クリア」ボタンをクリックしてください。<br>
    `,
    `이 다운로더는 자체 다운로드 기록을 저장합니다. 성공적으로 다운로드된(디스크에 저장된) 각 파일에는 다운로드 기록이 저장됩니다. 다운로드에 실패한 파일에는 다운로드 기록이 없습니다. <br>
    "<span class="key">중복</span>파일 다운로드 안 함" 기능을 활성화하면 다운로더는 각 파일을 다운로드하기 전에 다운로드 기록을 확인합니다. 중복 파일인 경우, 다운로더는 해당 파일을 건너뜁니다(다운로드하지 않습니다). <br>
    <br>
    추가 참고 사항: <br>
    - 이 기능은 신뢰할 수 없습니다. 다운로더는 디스크에 있는 파일을 읽을 권한이 없으므로 자체 저장된 다운로드 기록에만 의존합니다. 다운로드한 파일을 삭제하면 다운로더는 해당 파일이 다운로드된 것으로 인식하지 못하고 다운로드를 건너뜁니다. 다시 다운로드해야 하는 경우 이 기능을 끌 수 있습니다. <br>
    - 다운로더의 다운로드 기록은 브라우저의 IndexedDB에 저장됩니다. 브라우저의 다운로드 기록이 아니므로 브라우저의 다운로드 기록을 삭제해도 이 기능에는 영향을 미치지 않습니다. 참고로, 브라우저에 다운로드 기록이 너무 많으면 브라우저가 시작 시 잠시 멈춥니다. 이 문제가 발생하면 브라우저의 다운로드 기록을 삭제해야 합니다. <br>
    - 참고: 브라우저 데이터를 삭제할 때 "쿠키 및 기타 웹사이트 데이터"를 삭제하면 다운로더의 다운로드 기록이 삭제됩니다! 이 항목을 삭제하려면 다운로드 기록을 미리 내보내어 다운로드 기록이 손실되는 것을 방지할 수 있습니다. <br>
    - 여러 기기 또는 브라우저를 사용하는 경우, "내보내기" 버튼을 클릭하여 다운로더의 다운로드 기록을 내보낸 후 새 기기로 가져올 수 있습니다. <br>
    - 다운로더의 다운로드 기록을 지우려면 이 설정 오른쪽에 있는 "지우기" 버튼을 클릭하세요. <br>
    `,
    `Загрузчик сохраняет собственную историю загрузок. Каждый успешно загруженный файл (сохраненный на диск) получает запись в истории загрузок. Файлы, которые не удалось загрузить, не записываются.<br>
    Если вы включите функцию «Не загружать <span class="key">повторяющиеся</span> файлы», загрузчик будет проверять историю загрузок перед загрузкой каждого файла. Если файл является повторяющимся, загрузчик пропустит его (не будет загружать).<br>
    <br>
    Дополнительные пояснения:<br>
    - Это не надежная функция. У загрузчика нет прав на чтение файлов на диске, поэтому он может полагаться только на сохраненную историю загрузок. Если вы удалили загруженный файл, загрузчик этого не узнает и будет считать, что файл уже загружен, пропуская загрузку. Если вам нужно повторно загрузить файлы, вы можете отключить эту функцию.<br>
    - История загрузок сохраняется в IndexedDB браузера. Это не история загрузок браузера, поэтому очистка истории загрузок браузера не влияет на эту функцию. Дополнительно: если в браузере слишком много записей в истории загрузок, это может привести к зависанию браузера при запуске. Если вы столкнулись с этой проблемой, очистите историю загрузок браузера.<br>
    - Внимание: при очистке данных браузера удаление «Cookies и других данных сайтов» приведет к удалению истории загрузок загрузчика! Если вы планируете очистить эти данные, экспортируйте историю загрузок заранее, чтобы избежать потери данных.<br>
    - Если вы используете несколько устройств или браузеров, вы можете нажать кнопку «Экспортировать», чтобы экспортировать историю загрузок, а затем импортировать ее на новое устройство.<br>
    - Если вы хотите очистить историю загрузок загрузчика, нажмите кнопку «Очистить» справа от этой настройки.<br>
    `,
  ],
  _下载记录已清除: [
    `下载记录已清除`,
    `已清除下載紀錄`,
    `Download record has been cleared`,
    `ダウンロード履歴がクリアされました`,
    `다운로드 기록이 비워졌습니다`,
    `История загрузок очищена`,
  ],
  _跳过下载因为重复文件: [
    `检测到文件 {} 已经下载过，跳过此次下载`,
    `偵測到檔案 {} 已經下載過，跳過此次下載。`,
    `Detected that file {} has already been downloaded, skipping this download.`,
    `ファイル {} はすでにダウンロード済みであることを検出しました。今回のダウンロードをスキップします。`,
    `파일 {}이(가) 이미 다운로드되어 있어, 다운로드를 건너뜁니다`,
    `Обнаружено, что файл {} уже загружен, загрузка пропущена`,
  ],
  _导入下载记录: [
    `导入下载记录`,
    `匯入下載紀錄`,
    `Import download record`,
    `ダウンロード記録をインポート`,
    `다운로드 기록 불러오기`,
    `Импортировать историю загрузок`,
  ],
  _HowToUse: [
    `点击页面右侧的蓝色按钮可以打开下载器面板。<br>下载器可以在不同的页面里下载不同的内容，例如首页、用户主页、文章页面。<br><br>下载的文件保存在浏览器的下载目录里。<br><br>建议您在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。<br><br><strong>下载器不能绕过付费限制。</strong>`,
    `點選頁面右側的藍色按鈕可以開啟下載器面板。<br>下載器可以在不同的頁面裡下載不同的內容，例如首頁、使用者主頁、文章頁面。<br><br>下載的檔案儲存在瀏覽器的下載目錄裡。<br><br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><br><strong>下載器不能繞過付費限制。</strong>`,
    `Click the blue button on the right side of the page to open the downloader panel.<br>The downloader can download different content on different pages, such as the home page, user home page, and article page.<br><br>The downloaded files are saved in the browser's download folder.<br><br>It is recommended to turn off "Ask where to save each file before downloading" in the browser's download settings.<br><br><strong>The downloader cannot bypass paid restrictions.</strong>`,
    `ページ右側の青いボタンをクリックすると、ダウンローダーパネルが開きます。<br>ダウンローダーは、ホームページ、ユーザーホームページ、記事ページなど、さまざまなページのさまざまなコンテンツをダウンロードできます。<br><br>ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><br>ブラウザのダウンロード設定で 「 ダウンロード前に各ファイルの保存場所を確認する 」 をオフにすることをお勧めします。<br><br><strong>ダウンローダーは、有料の制限を回避できません。</strong>`,
    `페이지 오른쪽에 있는 파란색 버튼을 클릭하면 다운로드 패널이 열립니다。<br>다운로더는 홈페이지, 사용자 홈페이지, 기사 페이지 등 다양한 페이지에서 다양한 콘텐츠를 다운로드할 수 있습니다。<br><br>다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다。<br><br>브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치 확인"을 끄는 것이 좋습니다。<br><br><strong>다운로더는 유료 제한을 우회할 수 없습니다。</strong>`,
    `Нажмите синюю кнопку справа на странице, чтобы открыть панель загрузчика.<br>Загрузчик может загружать различный контент на разных страницах, например, на главной странице, странице пользователя или странице статьи.<br><br>Загруженные файлы сохраняются в папке загрузок браузера.<br><br>Рекомендуется отключить в настройках браузера опцию «Запрашивать место сохранения каждого файла перед загрузкой».<br><br><strong>Загрузчик не может обойти платные ограничения.</strong>`,
  ],
  _开始下载: [
    `开始下载`,
    `開始下載`,
    `Start download`,
    `開始`,
    `다운로드 시작`,
    `Начать загрузку`,
  ],
  _暂停下载: [
    `暂停下载`,
    `暫停下載`,
    `Pause download`,
    `一時停止`,
    `다운로드 일시중지`,
    `Приостановить загрузку`,
  ],
  _停止下载: [
    `停止下载`,
    `停止下載`,
    `Stop download`,
    `停止`,
    `다운로드 정지`,
    `Остановить загрузку`,
  ],
  _下载进度: [
    `下载进度`,
    `下載進度`,
    `Download progress`,
    `ダウンロード進捗`,
    `다운로드 진행률`,
    `Прогресс загрузки`,
  ],
  _数据清除完毕: [
    `数据清除完毕`,
    `資料清除完畢`,
    `Data cleared`,
    `データがクリアされました`,
    `데이터가 비워졌습니다`,
    `Данные очищены`,
  ],
  _已跳过n个文件: [
    `已跳过 {} 个文件`,
    `已跳過 {} 個檔案`,
    `{} files skipped`,
    `{} 個のファイルをスキップしました`,
    `{}개의 파일을 건너뛰었습니다`,
    `Пропущено {} файлов`,
  ],
  _统一网址格式: [
    `统一<span class="key">网址</span>格式`,
    `統一<span class="key">網址</span>格式`,
    `Unified <span class="key">URL</span> Format`,
    `統一 <span class="key">URL</span> 形式`,
    `통합 <span class="key">URL</span> 형식`,
    `Унифицированный формат <span class="key">URL</span>`,
  ],
  _统一网址格式的说明: [
    `保持用户名在域名之后，例如：https://www.fanbox.cc/@creator_id`,
    `保持使用者名稱在域名後面，例如：https://www.fanbox.cc/@creator_id`,
    `Keep the username after the domain name, for example: https://www.fanbox.cc/@creator_id`,
    `ユーザー名はドメイン名の後にあります。例: https://www.fanbox.cc/@creator_id`,
    `도메인 이름 뒤에 사용자 이름을 유지합니다. 예를 들면 다음과 같습니다. https://www.fanbox.cc/@creator_id`,
    `Сохранять имя пользователя после домена, например: https://www.fanbox.cc/@creator_id`,
  ],
  _正在保存抓取结果: [
    `正在保存抓取结果`,
    `正在儲存擷取結果`,
    `Saving crawl results`,
    `クロール結果を保存しています`,
    `긁어오기 결과 저장 중`,
    `Сохранение результатов сканирования`,
  ],
  _已保存抓取结果: [
    `已保存抓取结果`,
    `已儲存擷取結果`,
    `Crawl results saved`,
    `クロール結果を保存しました`,
    `긁어오기 결과가 저장되었습니다`,
    `Результаты сканирования сохранены`,
  ],
  _正在恢复抓取结果: [
    `正在恢复抓取结果`,
    `正在還原擷取結果`,
    `Restoring crawl results`,
    `クロール結果を復元しています`,
    `긁어오기 결과 복구 중`,
    `Восстановление результатов сканирования`,
  ],
  _已恢复抓取结果: [
    `已恢复抓取结果`,
    `已還原擷取結果`,
    `Crawl results restored`,
    `クロール結果を復元しました`,
    `긁어오기 결과가 복구되었습니다`,
    `Результаты сканирования восстановлены`,
  ],
  _清空已保存的抓取结果: [
    `清空已保存的抓取结果`,
    `清除已儲存的擷取結果`,
    `Clear saved crawl results`,
    `保存したクロール結果をクリアします`,
    `저장된 긁어오기 결과 비우기`,
    `Очистить сохраненные результаты сканирования`,
  ],
  _价格限制: [
    `价格限制`,
    `價格限制`,
    `Price limit`,
    `価格制限`,
    `가격 제한`,
    `Ограничение по цене`,
  ],
  _因为价格限制而跳过的投稿数量: [
    `因为价格限制而跳过的投稿数量：`,
    `因為價格限制而跳過的投稿數量：`,
    `Number of posts skipped due to price limit: `,
    `価格制限によりスキップされた投稿の数: `,
    `가격 제한으로 인해 건너뛴 게시물 수: `,
    `Количество публикаций, пропущенных из-за ограничения по цене:`,
  ],
  _投稿标题必须含有文字: [
    `投稿<span class="key">标题</span>必须含有文字`,
    `投稿<span class="key">標題</span>必須含有文字`,
    `Post <span class="key">title</span> must contain text`,
    `投稿の<span class="key">タイトル</span>にはテキストを含める必要があります`,
    `게시물 <span class="key">제목</span>에는 텍스트가 포함되어야 합니다`,
    `Заголовок <span class="key">публикации</span> должен содержать текст`,
  ],
  _投稿标题不能含有文字: [
    `投稿<span class="key">标题</span>不能含有文字`,
    `投稿<span class="key">標題</span>不能含有文字`,
    `Post <span class="key">title</span> cannot contain text`,
    `投稿の<span class="key">タイトル</span>にテキストを含めることはできません`,
    `게시물 <span class="key">제목</span>은 텍스트를 포함할 수 없습니다`,
    `Заголовок <span class="key">публикации</span> не должен содержать текст`,
  ],
  _文件名中必须含有文字: [
    `<span class="key">文件名</span>中必须含有文字`,
    `<span class="key">檔名</span>中必須含有文字`,
    `<span class="key">File name</span> must contain text`,
    `<span class="key">ファイル名</span>に指定した文字列を含める必要があります`,
    `<span class="key">파일 이름</span>에는 다음이 포함되어야 합니다`,
    `<span class="key">Имя файла</span> должно содержать текст`,
  ],
  _文件名中不能含有文字: [
    `<span class="key">文件名</span>中不能含有文字`,
    `<span class="key">檔名</span>中不能含有文字`,
    `<span class="key">File name</span> cannot contain text`,
    `<span class="key">ファイル名</span>に指定した文字列を含めないでください`,
    `<span class="key">파일 이름</span>에는 다음을 포함할 수 없습니다`,
    `<span class="key">Имя файла</span> не должно содержать текст`,
  ],
  _文件指的是附件: [
    `此处的文件指作者上传的附件（会显示文件名的那些），通常是压缩文件、视频、音频。`,
    `此處的檔案指作者上傳的附件（會顯示檔名的那些），通常是壓縮檔案、影片、音訊。`,
    `The file here refers to the attachment uploaded by the author (the file name will be displayed), usually a compressed file, video, or audio.`,
    `ここでのファイルとは、作成者がアップロードした添付ファイル (ファイル名が表示されます) を指し、通常は圧縮ファイル、ビデオ、またはオーディオです。`,
    `여기서 파일이란 작성자가 업로드한 첨부파일(파일명이 표시됩니다.)을 의미하며 일반적으로 압축된 파일, 비디오, 오디오 등입니다.`,
    `Здесь файлы относятся к вложениям, загруженным автором (с отображаемыми именами файлов), обычно это архивы, видео или аудио.`,
  ],
  _多条文字用逗号分割: [
    `你可以设置多条文字，不区分大小写；每条之间用半角逗号(,)分割`,
    `你可以設定多條文字，不區分大小寫；每條之間用半形逗號(,)分割`,
    `You can set multiple texts. They are not case-sensitive; separate each one with a half-width comma (,).`,
    `複数のテキストを設定でき、大文字と小文字を区別しません。それぞれをカンマ (,) で区切ります`,
    `대소문자를 구분하지 않고 여러 텍스트를 설정할 수 있으며 각각을 쉼표(,)로 구분할 수 있습니다.`,
    `Вы можете указать несколько текстов, без учета регистра; разделяйте их запятой (,).`,
  ],
  _日期时间格式错误: [
    `日期时间格式错误`,
    `日期時間格式錯誤`,
    `Wrong datetime format`,
    `間違った日時形式`,
    `잘못된 날짜/시간 형식`,
    `Неверный формат даты и времени`,
  ],
  _跳过文章因为: [
    `跳过 {} 因为：`,
    `跳過 {} 因為：`,
    `Skip {} because:`,
    `{} をスキップする理由:`,
    `다음과 같은 이유로 {}를 건너뜁니다.`,
    `Пропущено {} по причине:`,
  ],
  _不支持的浏览器: [
    `你的浏览器不能正常使用这个扩展程序，主要原因可能是浏览器内核版本太低，或者存在兼容性问题。<br>建议您更换成最新版本的 Chrome 或 Edge 浏览器。`,
    `你的瀏覽器不能正常使用這個擴充套件程式，主要原因可能是瀏覽器核心版本太低，或者存在相容性問題。<br>建議您更換成最新版本的 Chrome 或 Edge 瀏覽器。`,
    `Your browser cannot use this extension properly. The main reason may be that the browser kernel version is too low, or there is a compatibility problem. <br>We recommend that you switch to the latest version of Chrome or Edge.`,
    `お使いのブラウザでは、この拡張機能を正しく使用できません。主な理由としては、ブラウザのカーネル バージョンが低すぎるか、互換性の問題がある可能性があります。 <br>最新バージョンの Chrome または Edge に切り替えることをお勧めします。`,
    `브라우저에서 이 확장 프로그램을 제대로 사용할 수 없습니다. 주된 이유는 브라우저 커널 버전이 너무 낮거나 호환성 문제가 있기 때문일 수 있습니다. <br>최신 버전의 Chrome 또는 Edge로 전환하는 것이 좋습니다.`,
    `Ваш браузер не может корректно использовать это расширение. Основная причина может заключаться в слишком низкой версии ядра браузера или в проблемах совместимости.<br>Рекомендуется перейти на последнюю версию браузера Chrome или Edge.`,
  ],
  _user_canceled_tip: [
    `未保存该文件，错误代码：USER_CANCELED。原因：用户取消下载，或者被其他软件接管了下载。下载器不会重试下载它。`,
    `未儲存該檔案，錯誤代碼：USER_CANCELED。原因：使用者取消下載，或者被其他軟體接管了下載。下載器不會重試下載它。`,
    `The file was not saved, error code: USER_CANCELED. Reason: the download was canceled by the user, or it was taken over by other software. The downloader will not retry downloading it.`,
    `ファイルは保存されませんでした。エラーコード：USER_CANCELED。原因：ユーザーによるダウンロードのキャンセル、または他のソフトウェアによるダウンロードの引き継ぎ。ダウンローダーはこのファイルの再試行を行いません。`,
    `파일이 저장되지 않았습니다. 오류 코드: USER_CANCELED. 원인: 사용자가 다운로드를 취소했거나 다른 소프트웨어가 다운로드를 가로챘습니다. 다운로더는 이 파일을 다시 시도하지 않습니다.`,
    `Файл не был сохранен, код ошибки: USER_CANCELED. Причина: загрузка отменена пользователем или перехвачена другим программным обеспечением. Загрузчик не будет повторять попытку загрузки этого файла.`,
  ],
  _文件下载失败因为SERVER_BAD_CONTENT: [
    `文件下载失败，错误代码：SERVER_BAD_CONTENT。原因：文件可能已经不存在（404）。`,
    `檔案下載失敗，錯誤代碼：SERVER_BAD_CONTENT。原因：檔案可能已經不存在（404）。`,
    `File download failed, error code: SERVER_BAD_CONTENT. Reason: the file may no longer exist (404).`,
    `ファイルのダウンロードに失敗しました。エラーコード：SERVER_BAD_CONTENT。原因：ファイルが存在しない可能性があります（404）。`,
    `파일 다운로드에 실패했습니다. 오류 코드: SERVER_BAD_CONTENT. 원인: 파일이 더 이상 존재하지 않을 수 있습니다(404).`,
    `Не удалось загрузить файл, код ошибки: SERVER_BAD_CONTENT. Причина: файл, возможно, больше не существует (404).`,
  ],
  _文件下载失败因为SERVER_FAILED: [
    `文件下载失败，错误代码：SERVER_FAILED。原因：服务器端的错误（500）。`,
    `檔案下載失敗，錯誤代碼：SERVER_FAILED。原因：伺服器端的錯誤（500）。`,
    `File download failed, error code: SERVER_FAILED. Reason: a server-side error (500).`,
    `ファイルのダウンロードに失敗しました。エラーコード：SERVER_FAILED。原因：サーバー側のエラー（500）。`,
    `파일 다운로드에 실패했습니다. 오류 코드: SERVER_FAILED. 원인: 서버 측 오류(500).`,
    `Не удалось загрузить файл, код ошибки: SERVER_FAILED. Причина: ошибка на стороне сервера (500).`,
  ],
  _文件下载失败因为NETWORK_FAILED: [
    `文件下载失败，错误代码：NETWORK_FAILED。原因：网络错误，浏览器下载这个文件失败。`,
    `檔案下載失敗，錯誤代碼：NETWORK_FAILED。原因：網路錯誤，瀏覽器下載這個檔案失敗。`,
    `File download failed, error code: NETWORK_FAILED. Reason: a network error occurred and the browser failed to download this file.`,
    `ファイルのダウンロードに失敗しました。エラーコード：NETWORK_FAILED。原因：ネットワークエラーにより、ブラウザでのファイルのダウンロードに失敗しました。`,
    `파일 다운로드에 실패했습니다. 오류 코드: NETWORK_FAILED. 원인: 네트워크 오류로 브라우저가 이 파일을 다운로드하지 못했습니다.`,
    `Не удалось загрузить файл, код ошибки: NETWORK_FAILED. Причина: сетевая ошибка, браузеру не удалось загрузить этот файл.`,
  ],
  _文件下载失败并且错误代码是: [
    `文件下载失败，错误代码：{}`,
    `檔案下載失敗，錯誤代碼：{}`,
    `File download failed, error code: {}`,
    `ファイルのダウンロードに失敗しました。エラーコード：{}`,
    `파일 다운로드에 실패했습니다. 오류 코드: {}`,
    `Не удалось загрузить файл, код ошибки: {}`,
  ],
  _文件下载出错时显示文件名和网址: [
    `文件名：{}<br>网址：{}`,
    `檔案名稱：{}<br>網址：{}`,
    `File name: {}<br>URL: {}`,
    `ファイル名：{}<br>URL：{}`,
    `파일 이름: {}<br>URL: {}`,
    `Имя файла: {}<br>URL: {}`,
  ],
  _下载器会跳过这个错误文件的提示: [
    `该文件已经达到重试次数上限，下载器会保存一个同名的 txt 文件，然后跳过它。`,
    `該檔案已達到重試次數上限，下載器會儲存一個同名的 txt 檔案，然後跳過它。`,
    `This file has reached the retry limit. The downloader will save a txt file with the same name and then skip this file.`,
    `このファイルは再試行回数の上限に達しました。ダウンローダーは同名の txt ファイルを保存し、このファイルをスキップします。`,
    `이 파일이 재시도 횟수 상한에 도달했습니다. 다운로더는 같은 이름의 txt 파일을 저장한 후 이 파일을 건너뜁니다.`,
    `Этот файл достиг предела количества повторных попыток. Загрузчик сохранит txt-файл с тем же именем и пропустит этот файл.`,
  ],
  _下载完成后重试出错的文件的提示: [
    `如果你想重试下载出错的文件，可以这样做：<br>
    如果出错的文件较少，你可以选择错误提示里的网址，然后右键，选择“转到”以在新标签页中打开它。如果这个文件能成功加载的话，你可以手动保存它。<br>
    如果出错的文件较多，你可以在所有文件都下载完毕后，再次点击“开始下载”按钮进行重试。建议启用“不下载重复文件”功能以提高效率。`,
    `如果你想重試下載出錯的檔案，可以這樣做：<br>
如果出錯的檔案較少，你可以選擇錯誤提示裡的網址，然後右鍵，選擇「轉到」以在新分頁中開啟它。如果這個檔案能成功載入的話，你可以手動儲存它。<br>
如果出錯的檔案較多，你可以在所有檔案都下載完畢後，再次點擊「開始下載」按鈕進行重試。建議啟用「不下載重複檔案」功能以提高效率。`,
    `If you want to retry the files that failed to download, you can do the following:<br>
If only a few files failed, you can select the URL in the error message, right-click it, and choose "Open link in new tab". If the file loads successfully, you can save it manually.<br>
If many files failed, you can wait until all the other files have finished downloading, then click the "Start download" button again to retry. It is recommended to enable the "Do not download duplicate files" option to improve efficiency.`,
    `ダウンロードに失敗したファイルを再試行したい場合は、次のようにしてください：<br>
失敗したファイルが少ない場合は、エラー情報内の URL を選択して右クリックし、「新しいタブでリンクを開く」を選択してください。ファイルが正常に読み込まれた場合は、手動で保存できます。<br>
失敗したファイルが多い場合は、すべてのファイルのダウンロードが完了した後、再度「開始ダウンロード」ボタンをクリックして再試行してください。効率を上げるには「重複するファイルをダウンロードしない」機能を有効にすることをお勧めします。`,
    `다운로드에 실패한 파일을 다시 시도하려면 다음과 같이 하세요：<br>
실패한 파일이 적다면 오류 정보에 있는 URL을 선택한 후 마우스 오른쪽 버튼을 클릭하고 "이동"을 선택하면 새 탭에서 열립니다. 파일이 정상적으로 로드되면 수동으로 저장할 수 있습니다.<br>
실패한 파일이 많다면 모든 파일의 다운로드가 완료된 후 "다운로드 시작" 버튼을 다시 클릭하여 재시도하세요. 효율을 높이려면 "중복파일 다운로드하지 않기" 기능을 활성화하는 것이 좋습니다.`,
    `Если вы хотите повторить загрузку файлов, которые не удалось загрузить, сделайте следующее：<br>
Если таких файлов немного, выделите URL в сообщении об ошибке, нажмите на него правой кнопкой мыши и выберите «Перейти», чтобы открыть его в новой вкладке. Если файл успешно загрузится, вы можете сохранить его вручную.<br>
Если таких файлов много, дождитесь завершения загрузки всех остальных файлов и снова нажмите кнопку «Начать загрузку». Для повышения эффективности рекомендуется включить функцию «Не загружать повторяющиеся файлы».`,
  ],
  _文件下载失败下面是错误信息: [
    `文件下载失败，下面是错误信息：`,
    `檔案下載失敗，下面是錯誤資訊：`,
    `File download failed, here is the error information:`,
    `ファイルのダウンロードに失敗しました。以下はエラー情報です：`,
    `파일 다운로드에 실패했습니다. 아래는 오류 정보입니다:`,
    `Не удалось загрузить файл, ниже приведена информация об ошибке:`,
  ],
  _yandex浏览器的警告: [
    `如果你在 Yandex 浏览器（Android）上使用 Pixiv Fanbox Downloader，请换成 Kiwi 浏览器。<br>
    因为下载器在最近将会升级到 Manifest version 3，但是 Yandex 浏览器不支持 Manifest version 3， 所以它不能使用新版本的下载器。`,
    `如果你在 Yandex 瀏覽器（Android）上使用 Pixiv Fanbox Downloader，請換成 Kiwi 瀏覽器。<br>
因為下載器在最近將會升級到 Manifest version 3，但是 Yandex 瀏覽器不支援 Manifest version 3， 所以它不能使用新版本的下載器。`,
    `If you are using Pixiv Fanbox Downloader on Yandex browser（Android）, please switch to Kiwi browser. <br>
Because the downloader will be upgraded to Manifest version 3 in the near future, but Yandex browser does not support Manifest version 3, so it cannot use the new version of the downloader.`,
    `Yandex ブラウザ（Android）で Pixiv Fanbox Downloader を使用している場合は、Kiwi ブラウザに切り替えてください。 <br>
ダウンローダは近いうちにマニフェスト バージョン 3 にアップグレードされますが、Yandex ブラウザはマニフェスト バージョン 3 をサポートしていないため、新しいバージョンのダウンローダを使用することはできません。`,
    `Yandex Browser(Android)에서 Pixiv Fanbox Downloader를 사용하는 경우 Kiwi 브라우저로 전환하십시오. <br>
다운로더는 가까운 시일 내에 Manifest 버전 3으로 업그레이드되지만 Yandex 브라우저는 Manifest 버전 3을 지원하지 않으므로 새 버전의 다운로더를 사용할 수 없습니다.`,
    `Если вы используете Pixiv Fanbox Downloader в браузере Yandex (Android), пожалуйста, переключитесь на браузер Kiwi.<br>
Загрузчик скоро будет обновлен до Manifest версии 3, но браузер Yandex не поддерживает Manifest версии 3, поэтому он не сможет использовать новую версию загрузчика.`,
  ],
  _图片的命名规则: [
    `图片的<span class="key">命名规则</span>`,
    `圖片的<span class="key">命名規則</span>`,
    `<span class="key">Naming rule</span> for image files`,
    `画像ファイルの<span class="key">命名規則</span>`,
    `이미지 파일의<span class="key">명명 규칙</span>`,
    `<span class="key">Правила названий</span> для файлов изображений`,
  ],
  _非图片的命名规则: [
    `<span class="key">非图片</span>的命名规则`,
    `<span class="key">非圖片</span>的命名規則`,
    `Naming rule for <span class="key">non-image files</span>`,
    `<span class="key">画像以外</span>のファイルの命名規則`,
    `<span class="key">이미지가 아닌</span> 파일의 명명 규칙`,
    `<span class="key">Не являющиеся изображениями</span> правила названий файлов`,
  ],
  _任一: [`任一`, `任一`, `Any`, `何れか`, `어느 하나`, `Любой`],
  _提示会把外链保存到文件: [
    `这次的抓取结果里有一些网址，它们通常是外部链接。下载器会把它们保存到以“links-”开头的文件里，你可以手动处理。`,
    `這次的擷取結果裡有一些網址，它們通常是外部連結。下載器會把它們儲存到以「links-」開頭的檔案裡，你可以手動處理。`,
    `This crawl result contains some URLs, which are usually external links. The downloader will save them in a file whose name begins with "links-". You can handle them manually.`,
    `今回のクロール結果には、通常外部リンクである URL がいくつか含まれています。ダウンローダーはそれらを「links-」で始まるファイルに保存します。手動で処理できます。`,
    `이번 크롤링 결과에는 일반적으로 외부 링크인 URL이 일부 포함되어 있습니다. 다운로더는 이를 "links-"로 시작하는 파일에 저장하며, 수동으로 처리할 수 있습니다.`,
    `В результатах этого сканирования есть несколько URL-адресов, обычно это внешние ссылки. Загрузчик сохранит их в файл, имя которого начинается с "links-". Вы можете обработать их вручную.`,
  ],
  _下载器会等待几分钟然后再继续抓取: [
    `下载器会等待几分钟，然后再继续抓取。`,
    `下載器會等待幾分鐘，然後再繼續抓取。`,
    `The downloader will wait a few minutes before continuing to crawl.`,
    `ダウンローダーは数分間待機してから、クロールを続行します。`,
    `다운로더가 몇 분 기다린 후 크롤링을 계속합니다.`,
    `Загрузчик подождет несколько минут, а затем продолжит сканирование.`,
  ],
  _抓取间隔: [
    `抓取<span class="key">间隔</span>`,
    `抓取<span class="key">間隔</span>`,
    `Crawl <span class="key">interval</span>`,
    `クロール<span class="key">間隔</span>`,
    `크롤링 <span class="key">간격</span>`,
    `Интервал <span class="key">сканирования</span>`,
  ],
  _抓取间隔的说明: [
    `抓取投稿时，每个请求之间的间隔时间，单位是秒。<br>
    这是为了降低下载器发送请求的频率（特别是大量抓取时），从而减少账号被封的可能性。<br>
    你可以修改此设置，最小值是 0（即无限制）。`,
    `抓取投稿時，每個請求之間的間隔時間，單位是秒。<br>
    這是為了降低下載器傳送請求的頻率（特別是大量抓取時），從而減少賬號被封的可能性。<br>
    你可以修改此設定，最小值是 0（即無限制）。`,
    `The time interval between each request when crawling posts, in seconds. <br>
    This is intended to reduce the frequency of requests sent by the downloader (especially when crawling large volumes), thereby reducing the likelihood of your account being blocked. <br>
    You can modify this setting; the minimum value is 0 (no limit). `,
    `投稿をクロールする際の各リクエスト間の時間間隔（秒単位）。<br>
    これは、ダウンローダーから送信されるリクエストの頻度を減らすことを目的としています（特に大量の投稿をクロールする場合）。これにより、アカウントがブロックされる可能性が低減されます。<br>
    この設定は変更できます。最小値は 0（制限なし）です。`,
    `게시물을 크롤링할 때 각 요청 사이의 시간 간격(초)입니다. <br>
    이 설정은 다운로더가 보내는 요청 빈도를 줄이기 위한 것입니다(특히 대용량 게시물을 크롤링할 때). 따라서 계정이 차단될 가능성이 줄어듭니다. <br>
    이 설정은 수정할 수 있으며, 최소값은 0(제한 없음)입니다. `,
    `Интервал времени между каждым запросом при сканировании публикаций, в секундах.<br>
    Это сделано для снижения частоты запросов, отправляемых загрузчиком (особенно при сканировании больших объемов), чтобы уменьшить вероятность блокировки вашего аккаунта.<br>
    Вы можете изменить эту настройку; минимальное значение — 0 (без ограничений).`,
  ],
  _下载间隔: [
    `下载<span class="key">间隔</span>`,
    `下載<span class="key">間隔</span>`,
    `Download <span class="key">interval</span>`,
    `ダウンロード<span class="key">間隔</span>`,
    `다운로드 <span class="key">간격</span>`,
    `Интервал <span class="key">загрузки</span>`,
  ],
  _秒: [`秒`, `秒`, `seconds`, `秒`, `초`, `секунд`],
  _间隔时间: [
    `间隔时间：`,
    `間隔時間：`,
    `Interval time:`,
    `インターバル時間：`,
    `간격 시간:`,
    `Интервал времени:`,
  ],
  _下载间隔的说明: [
    `每隔一定时间开始一次下载，单位是秒。<br>
    默认值为 1，即每小时最多会从 Fanbox 下载 3600 个文件。<br>
    这是为了降低从 Fanbox 下载文件的频率（特别是下载体积较小的图片时），从而减少账号被封的可能性。<br>
    你可以修改此设置，最小值是 0（即无限制）。`,
    `每隔一定時間開始一次下載，單位是秒。<br>
    預設值為 1，即每小時最多會從 Fanbox 下載 3600 個檔案。<br>
    這是為了降低從 Fanbox 下載檔案的頻率（特別是下載體積較小的圖片時），從而減少賬號被封的可能性。<br>
    你可以修改此設定，最小值是 0（即無限制）。`,
    `The interval at which downloads are initiated, measured in seconds. <br>
    The default value is 1, meaning a maximum of 3,600 files will be downloaded from Fanbox per hour. <br>
    This is intended to reduce the frequency of downloads from Fanbox (especially when downloading small images), thereby reducing the likelihood of your account being blocked. <br>
    You can modify this setting; the minimum value is 0 (no limit). `,
    `ダウンロードを開始する間隔（秒単位）。<br>
    デフォルト値は1で、Fanboxから1時間あたり最大3,600個のファイルがダウンロードされます。<br>
    これは、Fanboxからのダウンロード頻度（特に小さな画像をダウンロードする場合）を減らし、アカウントがブロックされる可能性を減らすことを目的としています。<br>
    この設定は変更できます。最小値は0（制限なし）です。`,
    `다운로드 시작 간격(초)입니다. <br>
    기본값은 1이며, Fanbox에서 시간당 최대 3,600개의 파일이 다운로드됩니다. <br>
    이 설정은 Fanbox에서 다운로드 빈도(특히 작은 이미지 다운로드 시)를 줄여 계정이 차단될 가능성을 줄이기 위한 것입니다. <br>
    이 설정은 수정할 수 있으며, 최소값은 0(제한 없음)입니다. `,
    `Интервал, через который начинается загрузка, измеряется в секундах.<br>
    Значение по умолчанию — 1, что означает максимум 3600 файлов, загружаемых с Fanbox за час.<br>
    Это сделано для снижения частоты загрузок с Fanbox (особенно при загрузке небольших изображений), чтобы уменьшить вероятность блокировки вашего аккаунта.<br>
    Вы можете изменить эту настройку; минимальное значение — 0 (без ограничений).`,
  ],
  _已有抓取结果时进行提醒: [
    `这个标签页里已经有抓取结果了，重新开始抓取会清空这些抓取结果。\n请确认是否要重新开始抓取？`,
    `這個標籤頁裡已經有抓取結果了，重新開始抓取會清空這些抓取結果。\n請確認是否要重新開始抓取？`,
    `There are already crawl results on this tab. Restarting the crawl will clear these crawl results. \nPlease confirm that you want to restart the crawl?`,
    `このタブにはすでにクロール結果があります。クロールを再開すると、これらのクロール結果は消去されます。 \nクロールを再開するかどうかを確認してください?`,
    `이 탭에는 이미 크롤링 결과가 있습니다. 크롤링을 다시 시작하면 크롤링 결과가 지워집니다. \n크롤링을 다시 시작할 것인지 확인해주세요.`,
    `На этой вкладке уже есть результаты сканирования. Перезапуск сканирования очистит эти результаты.\nПожалуйста, подтвердите, хотите ли вы перезапустить сканирование?`,
  ],
  _账户可能被封禁的警告: [
    `<strong>警告</strong>：频繁和大量的抓取、下载可能会导致你的账号被封禁。<br>
    下载器默认会减慢抓取和下载的速度。但如果你的账户依然被封禁，下载器不会承担任何责任。<br>
    当你需要下载很多文件时，建议设置比较大的下载间隔时间。<br><br>`,
    `<strong>警告</strong>：頻繁和大量的抓取、下載可能會導致你的賬號被封禁。<br>
    下載器預設會減慢抓取和下載的速度。但如果你的賬戶依然被封禁，下載器不會承擔任何責任。<br>
    當你需要下載很多檔案時，建議設定比較大的下載間隔時間。<br><br>`,
    `<strong>Warning</strong>: Frequent and heavy crawling and downloading may result in your account being banned. <br>
    The downloader will slow down crawling and downloading speeds by default. However, if your account is still banned, the downloader will not be held responsible. <br>
    If you need to download a lot of files, it is recommended to set a longer download interval. <br><br>`,
    `<strong>警告</strong>: 頻繁かつ大量のクロールやダウンロードを行うと、アカウントがブロックされる可能性があります。<br>
    ダウンローダーはデフォルトでクロールとダウンロードの速度を低下させます。それでもアカウントがブロックされた場合、ダウンローダーは責任を負いません。<br>
    大量のファイルをダウンロードする必要がある場合は、ダウンロード間隔を長めに設定することをお勧めします。<br><br>`,
    `<strong>경고</strong>: 잦은 크롤링 및 다운로드는 계정 차단으로 이어질 수 있습니다。 <br>
    다운로더는 기본적으로 크롤링 및 다운로드 속도를 늦춥니다。 하지만 계정이 여전히 차단된 경우에도 다운로더는 책임을 지지 않습니다。 <br>
    많은 파일을 다운로드해야 하는 경우, 다운로드 간격을 더 길게 설정하는 것이 좋습니다。 <br><br>`,
    `<strong>Предупреждение</strong>: Частые и массовые загрузки и сканирования могут привести к блокировке вашего аккаунта.<br>
    Загрузчик по умолчанию снижает скорость загрузки и сканирования. Однако, если ваш аккаунт все равно будет заблокирован, загрузчик не несет за это ответственности.<br>
    Если вам нужно загрузить много файлов, рекомендуется установить более длинный интервал загрузки.<br>`,
  ],
  _移动端浏览器可能不会建立文件夹的说明: [
    `⚠️如果你使用的是移动端的浏览器，它可能不会建立文件夹。这不是下载器的问题。<br>如果你遇到了这种情况，需要修改命名规则以避免文件名重复。一个简单的方法是把默认命名规则里的 '/' 修改成 '-'。`,
    `⚠️如果你使用的是移動端的瀏覽器，它可能不會建立資料夾。這不是下載器的問題。<br>如果你遇到了這種情況，需要修改命名規則以避免檔名重複。一個簡單的方法是把預設命名規則裡的 '/' 修改成 '-'。`,
    `⚠️If you are using a mobile browser, it may not create a folder. This is not a problem with the downloader. If this happens, you need to modify the naming rules to avoid duplicate file names. A simple way to do this is to change the '/' in the default naming rules to '-'.`,
    `⚠️モバイルブラウザをご利用の場合、フォルダが作成されない場合があります。これはダウンローダーの問題ではありません。このような場合は、ファイル名の重複を避けるために命名規則を変更する必要があります。簡単な方法としては、デフォルトの命名規則の「/」を「-」に変更することです。`,
    `⚠️모바일 브라우저를 사용하는 경우 폴더가 생성되지 않을 수 있습니다. 이는 다운로더 문제가 아닙니다. 이 경우 파일 이름 중복을 방지하기 위해 파일 이름 지정 규칙을 수정해야 합니다. 간단한 방법은 기본 파일 이름 지정 규칙에서 '/'를 '-'로 변경하는 것입니다.`,
    `⚠️Если вы используете мобильный браузер, он может не создавать папки. Это не проблема загрузчика.<br>В таком случае вам нужно изменить правила именования, чтобы избежать дублирования имен файлов. Простой способ — заменить '/' в правилах именования по умолчанию на '-'.`,
  ],
  _请求失败下载器会重试这个请求: [
    `请求失败。下载器会重试这个请求，无须手动处理。`,
    `請求失敗。下載器會重試這個請求，無須手動處理。`,
    `The request failed. The downloader will retry the request, no manual processing is required.`,
    `リクエストが失敗しました。ダウンローダーがリクエストを再試行するため、手動処理は必要ありません。`,
    `요청이 실패했습니다. 다운로더가 요청을 다시 시도하며, 수동 처리는 필요하지 않습니다.`,
    `Запрос не удался. Загрузчик повторит запрос, ручная обработка не требуется.`,
  ],
  _每天下载的文件大小限制: [
    `每天下载的文件<span class="key">大小</span>限制`,
    `每天下載的檔案<span class="key">大小</span>限制`,
    `Daily download <span class="key">file size</span> limit`,
    `1日のダウンロード<span class="key">ファイルサイズ</span>制限`,
    `일일 다운로드 <span class="key">파일 크기</span> 제한`,
    `Ограничение на <span class="key">размер</span> файлов для ежедневной загрузки`,
  ],
  _达到每天下载的文件大小限制的说明: [
    `每天下载的文件大小限制。<br><br>这是下载器的一个安全功能，目的是为了避免在一天内下载过多的文件，导致账号被封禁。默认值是 10 GB，这是一个相对安全的限制。达到限制之后，需要等到第二天才能继续下载。<br>如果你想现在就继续下载，可以在下载器界面的下半部分找到“每天下载的文件大小限制”设置，并关闭它。`,
    `每天下載的檔案大小限制。<br><br>這是下載器的一項安全功能，目的是避免在一天內下載過多檔案，導致帳號被封禁。預設值為 10 GB，這是一個相對安全的限制。達到限制後，需要等到第二天才能繼續下載。<br>如果你想現在繼續下載，可以在下載器介面的下半部分找到「每天下載的檔案大小限制」設定，並將其關閉。`,
    `Daily download file size limit.<br><br>This is a safety feature of the downloader, intended to prevent your account from being banned due to downloading too many files in one day. The default value is 10 GB, which is a relatively safe limit. Once the limit is reached, you need to wait until the next day to continue downloading.<br>If you want to continue downloading now, find the "Daily download file size limit" setting in the lower half of the downloader interface and turn it off.`,
    `1日のダウンロードファイルサイズ制限。<br><br>これは、1日に過剰なファイルをダウンロードしてアカウントが停止されるのを防ぐための、ダウンローダーの安全機能です。デフォルト値は 10 GB で、比較的安全な制限です。制限に達した後は、翌日まで待ってからダウンロードを続行する必要があります。<br>今すぐダウンロードを続けたい場合は、ダウンローダー画面の下部にある「1日のダウンロードファイルサイズ制限」設定を見つけて無効にしてください。`,
    `일일 다운로드 파일 크기 제한.<br><br>하루에 너무 많은 파일을 다운로드하여 계정이 정지되는 것을 방지하기 위한 다운로더의 안전 기능입니다. 기본값은 비교적 안전한 제한인 10 GB입니다. 제한에 도달한 후에는 다음 날까지 기다려야 다운로드를 계속할 수 있습니다.<br>지금 다운로드를 계속하려면 다운로더 화면 하단에서 "일일 다운로드 파일 크기 제한" 설정을 찾아 해제하세요.`,
    `Ограничение на размер файлов для ежедневной загрузки.<br><br>Это функция безопасности загрузчика, предназначенная для предотвращения блокировки аккаунта из-за загрузки слишком большого количества файлов за один день. Значение по умолчанию — 10 ГБ, это относительно безопасное ограничение. После достижения лимита нужно дождаться следующего дня, чтобы продолжить загрузку.<br>Если вы хотите продолжить загрузку сейчас, найдите настройку «Ограничение на размер файлов для ежедневной загрузки» в нижней части интерфейса загрузчика и отключите её.`,
  ],
  _每天下载的文件大小限制的说明: [
    `每当下载完一个文件之后，下载器都会检查今天下载的文件的总体积。<br>
    如果达到了限制，下载器会自动暂停下载。<br>
    此功能是为了避免下载过多的文件，导致账号被封禁。<br>
    <br>
    说明：<br>
    1. “今天”指自然天，而非最近 24 小时。<br>
    2. 下载器只会统计下载成功的文件的体积。
    `,
    `每當下載完一個檔案之後，下載器都會檢查今天下載的檔案的總體積。<br>
    如果達到了限制，下載器會自動暫停下載。<br>
    此功能是為了避免下載過多的檔案，導致賬號被封禁。<br>
    <br>
    說明：<br>
    1. “今天”指自然天，而非最近 24 小時。<br>
    2. 下載器只會統計下載成功的檔案的體積。`,
    `After each file download, the downloader will check the total size of files downloaded today. <br>
    If the limit is reached, the downloader will automatically pause the download. <br>
    This feature is to prevent your account from being blocked due to excessive file downloads. <br>
    <br>
    Note: <br>
    1. "Today" refers to the calendar day, not the last 24 hours. <br>
    2. The downloader only counts the size of successfully downloaded files.`,
    `各ファイルのダウンロード後、ダウンローダーは今日ダウンロードされたファイルの合計サイズを確認します。<br>
    制限に達した場合、ダウンローダーは自動的にダウンロードを一時停止します。<br>
    この機能は、過剰なファイルダウンロードによるアカウント停止を防ぐためのものです。<br>
    <br>
    注: <br>
    1. 「今日」とは、過去24時間ではなく、暦日を指します。<br>
    2. ダウンローダーは、正常にダウンロードされたファイルのサイズのみをカウントします。`,
    `각 파일을 다운로드할 때마다 다운로더는 오늘 다운로드된 파일의 총 크기를 확인합니다. <br>
    한도에 도달하면 다운로더는 자동으로 다운로드를 일시 중지합니다. <br>
    이 기능은 과도한 파일 다운로드로 인해 계정이 정지되는 것을 방지하기 위한 것입니다. <br>
    <br>
    참고: <br>
    1. "오늘"은 지난 24시간이 아닌 해당 날짜를 의미합니다. <br>
    2. 다운로더는 성공적으로 다운로드된 파일의 크기만 계산합니다.`,
    `После каждой загрузки файла загрузчик проверяет общий размер файлов, загруженных сегодня.<br>
    Если достигнут лимит, загрузчик автоматически приостановит загрузку.<br>
    Эта функция предназначена для предотвращения блокировки вашего аккаунта из-за чрезмерных загрузок файлов.<br>
    <br>
    Примечание:<br>
    1. «Сегодня» означает календарный день, а не последние 24 часа.<br>
    2. Загрузчик учитывает только размер успешно загруженных файлов.`,
  ],
  _下载已暂停原因: [
    `下载已暂停，原因：`,
    `下載已暫停，原因：`,
    `Downloads paused due to:`,
    `ダウンロードが一時停止された理由:`,
    `다운로드가 일시 중지된 이유:`,
    `Загрузка приостановлена по причине:`,
  ],
  _查看历史数据: [
    `查看历史数据`,
    `檢視歷史資料`,
    `View historical data`,
    `履歴データの表示`,
    `이전 데이터 보기`,
    `Просмотр исторических данных`,
  ],
  _最近30天内的下载记录: [
    `最近 30 天内下载的文件的体积`,
    `最近 30 天內下載的檔案的體積`,
    `File size downloaded in the last 30 days`,
    `過去30日間にダウンロードされたファイルサイズ`,
    `지난 30일 동안 다운로드된 파일 크기`,
    `Размер файлов, загруженных за последние 30 дней`,
  ],
  _图片尺寸: [
    `图片<span class="key">尺寸</span>`,
    `圖片<span class="key">尺寸</span>`,
    `Image <span class="key">size</span>`,
    `画像<span class="key">サイズ</span>`,
    `이미지 <span class="key">크기</span>`,
    `<span class="key">Размер</span> изображения`,
  ],
  _图片尺寸的提示: [
    `下载投稿里的图片时，使用哪种尺寸`,
    `下載投稿裡的圖片時，使用哪種尺寸`,
    `When downloading images in the post, which size is used?`,
    `投稿内の画像をダウンロードする際、どのサイズを使用しますか`,
    `게시물 내 이미지를 다운로드할 때 어떤 크기를 사용하나요`,
    `При скачивании изображений в публикации, какой размер используется?`,
  ],
  _原图: [`原图`, `原圖`, `Original`, `Original`, `원본`, `Оригинал`],
  _缩略图: [`缩略图`, `縮圖`, `Thumbnail`, `サムネイル`, `썸네일`, `Миниатюра`],
  _保存所有粉丝卡: [
    `保存所有粉丝卡`,
    `保存所有粉絲卡`,
    `Save all fan cards`,
    `すべてのファンのカードを保存`,
    `모든 팬 카드 저장`,
    `Сохранить все фанатские карты`,
  ],
  _保存该用户的粉丝卡: [
    `保存该用户的粉丝卡`,
    `保存該用戶的粉絲卡`,
    `Save this user's fan card`,
    `このユーザーのファンのカードを保存します`,
    `이 사용자의 팬 카드를 저장합니다`,
    `Сохранить фанатскую карту этого пользователя`,
  ],
  _已保存该创作者的粉丝卡: [
    `已保存该创作者的粉丝卡`,
    `已保存該創作者的粉絲卡`,
    `The fan card of this creator has been saved`,
    `このクリエイターのファンのカードを保存しました`,
    `이 크리에이터의 팬 카드를 저장했습니다`,
    `Фанатская карта этого создателя сохранена`,
  ],
  _正在保存粉丝卡请稍后再试: [
    `正在保存粉丝卡，请稍后再试。`,
    `正在保存粉絲卡，請稍後再試。`,
    `Saving fan card, please try again later.`,
    `ファンのカードを保存中です。後ほどお試しください。`,
    `팬 카드 저장 중, 잠시 후 다시 시도해 주세요.`,
    `Сохранение фанатской карты, попробуйте позже.`,
  ],
  _你不是xx的赞助者无法生成粉丝卡: [
    `你不是 {} 的赞助者，无法生成粉丝卡。`,
    `你不是 {} 的贊助者，無法生成粉絲卡。`,
    `You are not a supporter of {}, so you cannot generate a fan card.`,
    `あなたは {} のサポーターではないため、ファンのカードを生成できません。`,
    `{}의 후원자가 아니므로 팬 카드를 생성할 수 없습니다.`,
    `Вы не спонсор {}, поэтому не можете генерировать фанатскую карту.`,
  ],
  _获取你对xx的赞助计划时出现错误: [
    `下载器获取你对 {} 的赞助计划时出现错误`,
    `下載器獲取你對 {} 的贊助計劃時出現錯誤`,
    `An error occurred when the downloader fetched your sponsorship plan for {}`,
    `ダウンロードツールが {} に対するあなたのスポンサーシッププランを取得する際にエラーが発生しました`,
    `다운로더가 {}에 대한 후원 계획을 가져올 때 오류가 발생했습니다`,
    `При получении загрузчиком вашего плана спонсорства для {} произошла ошибка`,
  ],
  _你想在粉丝卡上显示你的用户名吗: [
    `你想在粉丝卡上显示你的用户名吗？
选择“是”会显示用户名，
选择“否”会隐藏用户名。`,
    `你想在粉絲卡上顯示你的用戶名嗎？
選擇「是」會顯示用戶名，
選擇「否」會隱藏用戶名。`,
    `Do you want to display your username on the fan card?
Selecting "Yes" will show the username,
Selecting "No" will hide the username.`,
    `ファンのカードにユーザー名を表示しますか？
「はい」を選択するとユーザー名が表示されます。
「いいえ」を選択するとユーザー名が非表示になります。`,
    `팬 카드에 사용자 이름을 표시하시겠습니까?
"예"를 선택하면 사용자 이름이 표시됩니다.
"아니오"를 선택하면 사용자 이름이 숨겨집니다.`,
    `Хотите ли вы отображать ваше имя пользователя на фанатской карте?
Выбор «Да» отобразит имя пользователя,
Выбор «Нет» скроет имя пользователя.`,
  ],
  _你没有赞助任何创作者所以无法生成粉丝卡: [
    `你没有赞助任何创作者，所以无法生成粉丝卡。`,
    `你沒有贊助任何創作者，所以無法生成粉絲卡。`,
    `You have not sponsored any creators, so you cannot generate a fan card.`,
    `どのクリエイターもスポンサーしていないため、ファンのカードを生成できません。`,
    `어떤 크리에이터도 후원하지 않았으므로 팬 카드를 생성할 수 없습니다.`,
    `Вы не спонсируете ни одного создателя, поэтому не можете генерировать фанатскую карту.`,
  ],
  _开始保存粉丝卡: [
    `开始保存粉丝卡`,
    `開始保存粉絲卡`,
    `Start saving the fan card`,
    `ファンのカードの保存を開始します`,
    `팬 카드 저장을 시작합니다`,
    `Начать сохранение фанатской карты`,
  ],
  _粉丝卡保存完毕: [
    `粉丝卡保存完毕`,
    `粉絲卡保存完畢`,
    `Fan card saved successfully`,
    `ファンのカードの保存が完了しました`,
    `팬 카드 저장 완료`,
    `Фанатская карта сохранена`,
  ],
  _没有获取到背景图片的URL: [
    `没有获取到背景图片的 URL`,
    `沒有獲取到背景圖片的 URL`,
    `Failed to obtain the background image URL`,
    `背景画像の URL を取得できませんでした`,
    `배경 이미지 URL을 가져오지 못했습니다`,
    `Не удалось получить URL фонового изображения`,
  ],
  _颜色主题: [
    `颜色<span class="key">主题</span>`,
    `色彩<span class="key">主題</span>`,
    `Color <span class="key">theme</span>`,
    `<span class="key">カラー</span>テーマ`,
    `색상 <span class="key">테마</span>`,
    `Цветовая <span class="key">тема</span>`,
  ],
  _提示可以在release页面查看更新日志: [
    `你可以在本项目的 <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases 页面</a> 查看更新日志（中文）。`,
    `你可以在本項目的 <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases 頁面</a> 查看更新日誌（中文）。`,
    `You can view the update log (Chinese) on this project's <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases page</a>.`,
    `本プロジェクトの <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases ページ</a> で更新ログ（中国語）を確認できます。`,
    `본 프로젝트의 <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases 페이지</a>에서 업데이트 로그(중국어)를 확인할 수 있습니다.`,
    `Вы можете просмотреть журнал обновлений (на китайском) на странице <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader/releases" target="_blank">GitHub Releases</a> этого проекта.`,
  ],
  _扩展程序升到x版本: [
    `此扩展程序已经升级到 {} 版本。`,
    `此擴充程式已經升級到 {} 版本。`,
    `This extension has been upgraded to version {}.`,
    `この拡張機能はバージョン {} にアップグレードされました。`,
    `이 확장 프로그램이 {} 버전으로 업그레이드되었습니다.`,
    `Это расширение было обновлено до версии {}.`,
  ],
  _pixivDownloader的说明: [
    `如果你需要一个 Pixiv.net 下载器，可以尝试我制作的 Powerful Pixiv Downloader。<br><br>
Chromium 内核的浏览器（例如 Chrome、Edge）可以从 Chrome Web Store 安装：<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Firefox 浏览器可以从 Firefox Add-ons 安装：<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
    `如果你需要一個 Pixiv.net 下載器，可以試試我製作的 Powerful Pixiv Downloader。<br><br>
Chromium 核心的瀏覽器（例如 Chrome、Edge）可以從 Chrome Web Store 安裝：<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Firefox 瀏覽器可以從 Firefox Add-ons 安裝：<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
    `If you need a Pixiv.net downloader, you can try Powerful Pixiv Downloader made by me.<br><br>
Browsers based on Chromium, such as Chrome and Edge, can install it from the Chrome Web Store:<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Firefox users can install it from Firefox Add-ons:<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
    `Pixiv.net のダウンローダーが必要なら、私が作成した Powerful Pixiv Downloader を試してみてください。<br><br>
Chromium ベースのブラウザ（Chrome、Edge など）は、Chrome Web Store からインストールできます。<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Firefox は Firefox Add-ons からインストールできます。<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
    `Pixiv.net 다운로더가 필요하다면 제가 만든 Powerful Pixiv Downloader를 사용해 보세요.<br><br>
Chromium 기반 브라우저(예: Chrome, Edge)는 Chrome Web Store에서 설치할 수 있습니다.<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Firefox 브라우저는 Firefox Add-ons에서 설치할 수 있습니다.<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
    `Если вам нужен загрузчик для Pixiv.net, попробуйте Powerful Pixiv Downloader, который я сделал.<br><br>
Браузеры на базе Chromium, например Chrome и Edge, можно установить из Chrome Web Store:<br><a href="https://chromewebstore.google.com/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank">Powerful Pixiv Downloader</a><br><br>
Для Firefox его можно установить из Firefox Add-ons:<br><a href="https://addons.mozilla.org/en-US/firefox/addon/powerfulpixivdownloader/" target="_blank">Powerful Pixiv Downloader</a><br>`,
  ],
  _版本更新说明: [
    `<strong>✨在保存投稿中的文字时，新增了 HTML 格式</strong><br>
之前该设置只有 TXT 格式，查看时不会显示投稿里的图片、视频等内容。新增的 HTML 格式可以显示这些内容，阅读体验接近 Fanbox 的网页浏览效果。<br>
感谢 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> 提交了该功能。<br>
<strong>✨新增设置：保存投稿中的评论</strong><br>
感谢 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> 提交了该功能。`,
    `<strong>✨儲存投稿中的文字時，新增了 HTML 格式</strong><br>
之前此設定只有 TXT 格式，查看時不會顯示投稿中的圖片、影片等內容。新增的 HTML 格式可以顯示這些內容，閱讀體驗接近 Fanbox 的網頁瀏覽效果。<br>
感謝 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> 提交了此功能。<br>
<strong>✨新增設定：儲存投稿中的評論</strong><br>
感謝 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> 提交了此功能。`,
    `<strong>✨ Added HTML format when saving text in posts</strong><br>
Previously, this setting only supported TXT format, which did not display images, videos, and other content from posts when viewed. The new HTML format displays this content, offering a reading experience close to browsing Fanbox on the web.<br>
Thanks to <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> for contributing this feature.<br>
<strong>✨ New setting: Save comments in posts</strong><br>
Thanks to <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> for contributing this feature.`,
    `<strong>✨投稿内のテキスト保存に HTML 形式を追加</strong><br>
以前はこの設定で TXT 形式しか選択できず、閲覧時に投稿内の画像、動画などは表示されませんでした。新しい HTML 形式ではこれらの内容を表示でき、Fanbox のウェブページに近い閲覧体験を得られます。<br>
この機能を提供してくださった <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> に感謝します。<br>
<strong>✨新しい設定：投稿内のコメントを保存</strong><br>
この機能を提供してくださった <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> に感謝します。`,
    `<strong>✨게시물의 텍스트를 저장할 때 HTML 형식 추가</strong><br>
이전에는 이 설정에서 TXT 형식만 지원했으며, 볼 때 게시물의 이미지, 동영상 등의 내용이 표시되지 않았습니다. 새 HTML 형식은 이러한 내용을 표시할 수 있어 Fanbox 웹페이지를 보는 것과 가까운 읽기 경험을 제공합니다.<br>
이 기능을 기여해 주신 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a>님께 감사드립니다.<br>
<strong>✨새 설정: 게시물의 댓글 저장</strong><br>
이 기능을 기여해 주신 <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a>님께 감사드립니다.`,
    `<strong>✨ Добавлен формат HTML при сохранении текста публикаций</strong><br>
Ранее в этой настройке был доступен только формат TXT, при просмотре которого изображения, видео и другое содержимое публикаций не отображались. Новый формат HTML позволяет отображать это содержимое и делает чтение ближе к просмотру страницы Fanbox в браузере.<br>
Спасибо <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> за добавление этой функции.<br>
<strong>✨ Новая настройка: сохранять комментарии к публикациям</strong><br>
Спасибо <a href="https://github.com/Eganchiyu" target="_blank">Eganchiyu</a> за добавление этой функции.`,
  ],
  _帮助: [`帮助`, `幫助`, `Help`, `ヘルプ`, `도움말`, `Справка`],
  _开始获取投稿列表: [
    `开始获取投稿列表`,
    `開始取得投稿清單`,
    `Start fetching the post list`,
    `投稿リストの取得を開始します`,
    `게시물 목록 가져오기를 시작합니다`,
    `Начать получать список публикаций`,
  ],
  _没有找到投稿列表的提示: [
    `没有找到投稿列表，可能是因为这个创作者没有任何投稿`,
    `沒有找到投稿清單，可能是因為這位創作者沒有任何投稿`,
    `No post list was found. This creator may not have any posts.`,
    `投稿リストが見つかりませんでした。このクリエイターには投稿がない可能性があります。`,
    `게시물 목록을 찾을 수 없습니다. 이 크리에이터에게는 게시물이 없을 수 있습니다.`,
    `Список публикаций не найден. Возможно, у этого создателя нет публикаций.`,
  ],
}
