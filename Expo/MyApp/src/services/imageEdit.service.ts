import * as ImageManipulator from "expo-image-manipulator";

export async function rotate(uri: string, deg: 90 | -90) {
  return ImageManipulator.manipulateAsync(uri, [{ rotate: deg }], {
    compress: 1,
    format: ImageManipulator.SaveFormat.JPEG,
  });
}

export async function flipH(uri: string) {
  return ImageManipulator.manipulateAsync(uri, [{ flip: ImageManipulator.FlipType.Horizontal }], {
    compress: 1,
    format: ImageManipulator.SaveFormat.JPEG,
  });
}

export async function flipV(uri: string) {
  return ImageManipulator.manipulateAsync(uri, [{ flip: ImageManipulator.FlipType.Vertical }], {
    compress: 1,
    format: ImageManipulator.SaveFormat.JPEG,
  });
}
