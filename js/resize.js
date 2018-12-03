const resize = (container, image) => {
  const initImgRatio = image.width / image.height;
  const imageIsWider = image.width > container.width;
  const imageVsContainerWidth = image.width - container.width;
  const imageVsContainerHeight = image.height - container.height;
  const imageIsHigher = image.height > container.height;
  const containerIsHigher = container.height > image.height;

  if (imageIsWider && (imageVsContainerWidth) > (imageVsContainerHeight)) {
    image.width = container.width;
    image.height = image.width / initImgRatio;
  } else if (imageIsWider && (imageVsContainerWidth) < (imageVsContainerHeight)) {
    image.height = container.height;
    image.width = image.height * initImgRatio;
  } else if (imageIsHigher) {
    image.height = container.height;
    image.width = image.height * initImgRatio;
  } else if (containerIsHigher) {
    image.width = container.width;
    image.height = image.width / initImgRatio;
  }

  const newDimensions = Object.assign({}, image);
  return newDimensions;
};

export default resize;
