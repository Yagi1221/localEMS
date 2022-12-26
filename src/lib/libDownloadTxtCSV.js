export default function(content, filename) {
    var uri = 'data:text/csv;charset=utf-8,' + content;
    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = filename+".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
 