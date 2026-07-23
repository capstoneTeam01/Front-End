const path = require("path");
const {
  getExpoTransformer,
} = require("react-native-svg-transformer");
const svgTransformer = require("react-native-svg-transformer/expo");

const expoTransformer = getExpoTransformer();

module.exports.transform = async ({ src, filename, ...rest }) => {
  const animationDirectory = path.dirname(filename);
  const isBeeAnimation =
    filename.endsWith(".svg") &&
    path.basename(animationDirectory) === "bee-animations" &&
    path.basename(path.dirname(animationDirectory)) === "assets";

  if (isBeeAnimation) {
    return expoTransformer.transform({
      src: `export default ${JSON.stringify(src)};`,
      filename,
      ...rest,
    });
  }

  return svgTransformer.transform({ src, filename, ...rest });
};
