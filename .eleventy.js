const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes){
    let metaData = await Image(`./src${src}`, {
        widths: [300, 800, null],
        formats: ["avif","jpeg"],
        urlPath: "/images/",
        outputDir: "./public/images/"
    });
    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async"
    };
    return Image.generateHTML(metaData, imageAttributes);
}


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addWatchTarget("./src/css");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy({"./src/favicon": "/"});
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
    
    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};