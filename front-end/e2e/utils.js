async function selectOptionByText(page, name, optionText) {
    let optionWaned = null;
    let optionValue = null;

    try {
        optionWaned = (
            await page.$x(`//*[@name = "${name}"]/option[text() = "${optionText}"]`)
        )[0];
    } catch (error) {
        console.error("Error in selectOptionByText (optionWaned)", { error });
        throw error;
    }

    try {
        optionValue = await (
            await optionWaned.getProperty("value")
        ).jsonValue();
    } catch (error) {
        console.error("Error in selectOptionByText (optionValue)", { error });
        throw error;
    }

    if (optionWaned === null || optionValue === null) {
        console.error("Error in selectOptionByText (null check)");
        throw "Null check failed";
    }

    return await page.select(`[name=${name}`, optionValue);
}

function containsText(page, selector, expected) {
    return page.evaluate(
        (selector, expected) => {
            return document
                .querySelector(selector)
                .innerText.toLowerCase()
                .includes(expected);
        },
        selector,
        expected
    );
}

module.exports = {
    containsText,
    selectOptionByText,
};