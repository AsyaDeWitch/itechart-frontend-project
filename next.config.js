import withOptimizedImages from "next-optimized-images";
// import imagemin from "imagemin";
// import imageminPngquant from "imagemin-pngquant";

export default withOptimizedImages({
  inlineImageLimit: 8192,
  imagesFolder: "images",
  imagesName: "[name]-[hash].[ext]",
  handleImages: ["png"],
  removeOriginalExtension: false,
  optimizeImages: true,
  optimizeImagesInDev: false,
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: true,
  /* (async () => {
    await imagemin(["images/*.png"], {
      destination: "",
      plugins: [
        imageminPngquant()
      ]
    });
    console.log("Images optimized");
  }) */
});
