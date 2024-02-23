async function init(){
    getCurrentUserNumber()
    await includeHTML();
    await loadPreviousMember();
    await loadCurrentUserData();
    await renderUserInitial();
    await openBurgerMenu();
    await openBurgerMenuMobile();
 }