// Auto Bilty Number
function setBiltyNumber() {
  let lastNumber = localStorage.getItem("biltyNumber");

  if (!lastNumber) {
    lastNumber = 1;
  } else {
    lastNumber = parseInt(lastNumber) + 1;
  }

  document.getElementById("biltyNumber").value = lastNumber;
  localStorage.setItem("biltyNumber", lastNumber);
}

// Date Picker Init
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#date", {
    dateFormat: "Y-m-d",
    allowInput: true
  });

  setBiltyNumber();
});


document.addEventListener("DOMContentLoaded", function () {
  const builty = document.getElementById("builty");

  // === Download as Image ===
  document.getElementById("downloadImageBtn").addEventListener("click", function () {
    html2canvas(builty, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "builty.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  // === Download as PDF ===
  document.getElementById("downloadPdfBtn").addEventListener("click", function () {
    html2canvas(builty, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf.jsPDF("p", "mm", "a4");

      // Calculate image width/height for A4 size
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("builty.pdf");
    });
  });
});


