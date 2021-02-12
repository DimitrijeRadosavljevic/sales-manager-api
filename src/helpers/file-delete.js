const fs = require('fs').promises;

export const unlinkFile = async path => {
    try {

        if(path != "") {
            let fullPath = 'storage/app/product_images/'+ path.split("/")[4];
            await fs.unlink(fullPath);
        }
        return true;
    } catch (error) {

        console.log("Error ocured" + error);
        return false;

    }
}