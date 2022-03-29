      var a = document.createElement('A');
      a.href = `data:application/json;base64,${data.data.base64Bytes}`;
      a.target = '_blank';
      a.download = 'my-file.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);