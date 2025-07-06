let stream = null;

let constraints = {
  video: { facingMode: "user" },
  audio: true
};

let startRecording = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('✅ Камера запущена');

    const videoElement = document.querySelector("video");
    videoElement.srcObject = stream;

    let recorderChunks = [];
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      recorderChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recorderChunks, { type: "video/webm" }); // կամ video/mp4, եթե ապահովվում է
      const url = URL.createObjectURL(blob);

      // Ստեղծում ենք ներբեռնման հղում
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-video.webm';
      a.click();

      URL.revokeObjectURL(url);
      console.log("📥 Տեսանյութը պահպանվել է");
    };

    mediaRecorder.start();
    console.log("🔴 Запись началась");

    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
      console.log("⏹️ Запись остановлена");
    }, 5000); // 3 վայրկյան

  } catch (error) {
    console.error('❌ Սխալ:', error);
  }
};

startRecording();
