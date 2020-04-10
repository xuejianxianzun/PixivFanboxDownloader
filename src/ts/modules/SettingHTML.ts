import { lang } from './Lang'

const formHtml = `<form class="settingForm">
  <div class="tabsTitle">
    <div class="title">${lang.transl('_抓取')}</div>
    <div class="title">${lang.transl('_下载')}</div>
    <div class="title">${lang.transl('_其他')}</div>
  </div>
  <div class="tabsContnet">
    <div class="con">

      <p class="option" data-no="1">
      <span class="setWantPageWrap">
      <span class="has_tip settingNameStyle1 setWantPageTip1" data-tip="${lang.transl(
        '_投稿数量说明'
      )}" style="margin-right: 0px;">${lang.transl('_投稿数量')}</span>
      <span class="gray1" style="margin-right: 10px;"> ? </span>
      <input type="text" name="setWantPage" class="setinput_style1 blue setWantPage"
      value = '-1'>
      &nbsp;&nbsp;&nbsp;
      <span class="setWantPageTip2 gray1">-1 或者大于 0 的数字</span>
      </span>
      </p>

      <p class="option" data-no="2">
      <span class="settingNameStyle1">${lang.transl('_文件类型')}</span>

      <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType1"> ${lang.transl('_图片')}&nbsp;</label>
      
      <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType2"> ${lang.transl('_音乐')}&nbsp;</label>

      <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType3"> ${lang.transl('_视频')}&nbsp;</label>
      
      <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType4"> ${lang.transl('_压缩文件')}&nbsp;</label>
      
      <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType5"> ${lang.transl('_PS文件')}&nbsp;</label>

      <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType6"> ${lang.transl('_其他')}&nbsp;</label>
      </p>

      <p class="option" data-no="21">
      <span class="settingNameStyle1">${lang.transl('_投稿类型')}</span>

      <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType1"> ${lang.transl('_免费投稿')}&nbsp;</label>

      <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType2"> ${lang.transl('_付费投稿')}&nbsp;</label>
      </p>

      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${lang.transl(
        '_设置价格范围'
      )}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="feeSwitch">

      ${lang.transl('_最小值')}
      <input type="text" name="fee" class="setinput_style1 w100 blue" value="500"> ${lang.transl(
        '_日元'
      )}
      </span>
      </p>
      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${lang.transl('_设置id范围')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="idRangeSwitch">

      ${lang.transl('_大于')}
      <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
      </span>
      </p>

      <p class="option" data-no="10">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置投稿时间提示'
      )}">${lang.transl('_设置投稿时间')} <span class="gray1"> ? </span></span>

      <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="postDate">
      
      ${lang.transl('_晚于')}
      <input type="datetime-local" name="postDateStart" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      </span>
      </p>

      <p class="option" data-no="19">
      <span class="settingNameStyle1">${lang.transl(
        '_保存投稿中的外部链接'
      )}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <slot data-name="crawlBtns" class="centerWrap_btns"></slot>
    </div>
    <div class="con">
    <p class="option" data-no="13">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置文件夹名的提示'
      )}">${lang.transl('_设置文件名')}<span class="gray1"> ? </span></span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value="{id}">
      &nbsp;
      <select name="fileNameSelect">
        <option value="default">…</option>
        <option value="{id}">{id}</option>
        <option value="{title}">{title}</option>
        <option value="{tags}">{tags}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{date}">{date}</option>
        <option value="{fee}">{fee}</option>
        <option value="{user}">{user}</option>
        <option value="{uid}">{uid}</option>
        </select>
      &nbsp;&nbsp;
      <span class="showFileNameTip">？</span>
      </p>
      <p class="fileNameTip tip">
      <strong>${lang
        .transl('_设置文件夹名的提示')
        .replace('<br>', '. ')}</strong>
      <br>
      <span class="blue">{id}</span>
      ${lang.transl('_命名标记id')}
      <br>
      <span class="blue">{user}</span>
      ${lang.transl('_命名标记user')}
      <br>
      <span class="blue">{uid}</span>
      ${lang.transl('_命名标记uid')}
      <br>
      <span class="blue">{title}</span>
      ${lang.transl('_命名标记title')}
      <br>
      <span class="blue">{tags}</span>
      ${lang.transl('_命名标记tags')}
      <br>
      <span class="blue">{date}</span>
      ${lang.transl('_命名标记date')}
      <br>
      ${lang.transl('_命名标记提醒')}
      </p>
      
      <slot data-name="namingBtns" class="centerWrap_btns"></slot>

      <p class="option" data-no="16">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_线程数字'
      )}">${lang.transl('_设置下载线程')}<span class="gray1"> ? </span></span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>

      <p class="option" data-no="17">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_自动下载的提示'
      )}">${lang.transl('_自动开始下载')}<span class="gray1"> ? </span></span>
      <input type="checkbox" name="quietDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>

      <slot data-name="downloadArea"></slot>
      <slot data-name="progressBar"></slot>
    </div>
    <div class="con">
      
      <slot data-name="otherBtns" class="centerWrap_btns"></slot>
    </div>
  </div>
</form>`

export default formHtml
