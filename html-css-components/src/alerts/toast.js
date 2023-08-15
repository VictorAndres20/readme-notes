<script>
    function showAlert(id, message){
      document.getElementById(`${id}_msg`).innerHTML = message;
      document.getElementById(id).style.display = 'flex';      
      setTimeout(() => {
        dismissAlert(id);
      }, 5000);
    }

    function dismissAlert(id){
      document.getElementById(id).style.display = 'none';
      document.getElementById(`${id}_msg`).innerHTML = '';
    }

    function alertSuccess(msg){
      showAlert('vp_alert_success', msg);
    }

    function alertError(msg){
      showAlert('vp_alert_danger', msg);
    }
</script>