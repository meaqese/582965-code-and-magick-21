'use strict';


const MIME_TYPES = [`image/jpeg`, `image/gif`, `image/png`];

const fileChooser = window.dialog.setup.querySelector(`.upload input[type=file]`);
const preview = window.dialog.setup.querySelector(`.setup-user-pic`);

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];

  const isAllowed = MIME_TYPES.some((fileType) => file.type === fileType);

  if (isAllowed) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  } else {
    window.util.createErrorMessage(`Файл должен иметь расширение JPEG, JPG, GIF или PNG`);
  }
});
