// Buttons switch between three sections of the artist study.
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function selectTab(index) {
    for (let i = 0; i < tabs.length; i++) {
        const selected = i === index;
        tabs[i].setAttribute('aria-selected', String(selected));
        tabs[i].tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
    }
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
        selectTab(i);
        window.location.hash = panels[i].id;
    });
    tabs[i].addEventListener('keydown', function (event) {
        let next = i;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(next);
        window.location.hash = panels[next].id;
        tabs[next].focus();
    });
}

function selectFromLink() {
    let section = window.location.hash.replace('#', '');
    try {
        section = decodeURIComponent(section);
    } catch (error) {
        // Ignore an incomplete URL escape instead of breaking the artist tabs.
        return;
    }
    const target = document.getElementById(section);
    for (let i = 0; i < panels.length; i++) {
        if (panels[i].id === section || (target && panels[i].contains(target))) {
            selectTab(i);
            if (target && target !== panels[i]) {
                requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
            }
            return;
        }
    }
    // Other links, such as #top, must not change the reading section.
}
selectTab(0);
selectFromLink();
window.addEventListener('hashchange', selectFromLink);
