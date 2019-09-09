const elements = {
  target_max_hp: {
    id: 'target-max-hp',
    label: 'Targets\'s Max HP',
    element: `<input id="target-max-hp" type="range" min="1000" max="200000" class="custom-range" value="10000" onchange="resolve()" oninput="slide('target-max-hp')" />`,
    value: () => Number(document.getElementById('target-max-hp').value)
  },
  target_hp_pc: {
    id: 'target-hp-pc',
    label: 'Targets\'s HP',
    percent: true,
    element: `<input id="target-hp-pc" type="range" min="1" max="100" class="custom-range" value="100" onchange="resolve()" oninput="slide('target-hp-pc')" />`,
    value: () => Number(document.getElementById('target-hp-pc').value)
  },
  target_hp: {
    id: 'target-hp',
    label: 'Targets\'s HP',
    element: `<input id="target-hp" type="range" min="1000" max="200000" class="custom-range" value="10000" onchange="resolve()" oninput="slide('target-hp')" />`,
    value: () => Number(document.getElementById('target-hp').value)
  },
  target_nb_buff: {
    id: 'target-nb-buff',
    label: 'Buffs on Targets',
    element: `<input id="target-nb-buff" type="range" min="0" max="9" class="custom-range" value="0" onchange="resolve()" oninput="slide('target-nb-buff')" />`,
    value: () => Number(document.getElementById('target-nb-buff').value)
  },
  target_has_buff: {
    id: 'target-has-buff',
    label: 'Target has buffs',
    element: `<input id="target-has-buff" type="checkbox" onchange="resolve()" class="custom-control-input" />`,
    value: () => document.getElementById('target-has-buff').checked
  },
  caster_max_hp: {
    id: 'caster-max-hp',
    label: 'Caster\'s Max HP',
    element: `<input id="caster-max-hp" type="range" min="1000" max="50000" class="custom-range" value="10000" onchange="resolve()" oninput="slide('caster-max-hp')" />`,
    value: () => Number(document.getElementById('caster-max-hp').value)
  },
  caster_hp_pc: {
    id: 'caster-hp-pc',
    label: 'Caster\'s HP',
    percent: true,
    element: `<input id="caster-hp-pc" type="range" min="1" max="100" class="custom-range" value="100" onchange="resolve()" oninput="slide('caster-hp-pc')" />`,
    value: () => Number(document.getElementById('caster-hp-pc').value)
  },
  caster_hp: {
    id: 'caster-hp',
    label: 'Caster\'s HP',
    element: `<input id="caster-hp" type="range" min="1000" max="50000" class="custom-range" value="10000" onchange="resolve()" oninput="slide('caster-hp')" />`,
    value: () => Number(document.getElementById('caster-hp').value)
  }
};

const slide = (fieldId) => {
  document.getElementById(`${fieldId}-val`).innerText = document.getElementById(fieldId).value
};

const build = (hero) => {
  if (hero.form) {
    const specificBlock = document.getElementById('custom-block');
    specificBlock.innerHTML = '';
    for (let elem of hero.form) {
      $(specificBlock).append(`<div class="form-group col-sm-12">
                        <label for="${elem.id}">${elem.label}: <span id="${elem.id}-val"></span>${elem.percent ? '%' : ''}</label>
                        ${elem.element}
                    </div>`);
    }
  }

  const molagoraBlock = document.getElementById('molagora-block');
  molagoraBlock.innerHTML = '';
  for (let id of Object.keys(hero.skills)) {
    const skill = hero.skills[id];
    if (skill.enhance) {
      $(molagoraBlock).append(`<div class="form-group col-sm-6">
                        <label for="molagora-${id}">${id.toUpperCase()}: +<span id="molagora-${id}-val"></span></label>
                        <input id="molagora-${id}" type="range" min="0" max="${skill.enhance.length}" class="custom-range" value="0" onchange="resolve()" oninput="slide('molagora-${id}')" />
                    </div>`);
    }
  }
};

$(() => {
  const heroSelector = document.getElementById('hero');
  Object.keys(heroes).map((id => {
    $(heroSelector).append(`<option value="${id}">${heroes[id].name}</option>`)
  }));

  heroSelector.onchange = () => {
    build(heroes[heroSelector.value]);
    resolve();
    $('input[type="range"]').each((_, elem) => {
      slide(elem.getAttribute('id'));
    });
  };

  build(heroes[heroSelector.value]);
  resolve();
  $('input[type="range"]').each((_, elem) => {
    slide(elem.getAttribute('id'));
  });
});