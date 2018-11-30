const resize = (container, image) => {
  const initImgRatio = image.width / image.height;

  if (image.width > container.width && (image.width - container.width) > (image.height - container.height)) {
    // img > container, width to fix
    image.width = container.width;
    image.height = image.width / initImgRatio;
  } else if (image.width > container.width && (image.width - container.width) < (image.height - container.height)) {
    // img > container, height to fix
    image.height = container.height;
    image.width = image.height * initImgRatio;
  } else if (image.height > container.height) {
    // img > container, height to fix
    image.height = container.height;
    image.width = image.height * initImgRatio;
  } else if (image.height < container.height && (container.heigh - image.heigh) > (container.width - image.width)) {
    // img < container, width to fix
    image.width = container.width;
    image.height = image.width / initImgRatio;
  } else if (image.height < container.height && (container.heigh - image.heigh) < (container.width - image.width)) {
    // img < container, height to fix
    image.height = container.height;
    image.width = image.height * initImgRatio;
  }

  const newDimensions = Object.assign({}, image);
  return newDimensions;
};

export default resize;
