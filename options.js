// Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get('logs', function(items) {
    //document.getElementById('logs') = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
//document.getElementById('save').addEventListener('click', save_options);

document.getElementById('adicionar-lista').addEventListener('click', function(){
  let list = document.getElementById('blacklist');
  let li = list.children[0].cloneNode(true);
  list.appendChild(li);
});
