const resize = (container, image) => {
  const initImgRatio = image.width / image.height;
  const calculatedHeight = container.width / initImgRatio;
  const calculatedWidth = container.height * initImgRatio;
  const imageIsWider = image.width > container.width;
  const imageVsContainerWidth = image.width - container.width;
  const imageVsContainerHeight = image.height - container.height;
  const imageIsHigher = image.height > container.height;
  const containerIsHigher = container.height > image.height;

  if (imageIsWider && (imageVsContainerWidth) > (imageVsContainerHeight)) {
    image.width = container.width;
    image.height = calculatedHeight;
  } else if (imageIsWider && (imageVsContainerWidth) < (imageVsContainerHeight)) {
    image.height = container.height;
    image.width = calculatedWidth;
  } else if (imageIsHigher) {
    image.height = container.height;
    image.width = calculatedWidth;
  } else if (containerIsHigher) {
    image.width = container.width;
    image.height = calculatedHeight;
  }

  const newDimensions = Object.assign({}, image);
  return newDimensions;
};

export default resize;
