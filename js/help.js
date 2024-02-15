async function init(){
    await includeHTML();
    await loadPreviousMember();
    await loadCurrentUserData();
    renderUserInitial();
 }