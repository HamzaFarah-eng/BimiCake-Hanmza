export const paginate = (page, limit) => {
    if (!page || page <= 0) {
        page = 1;
    }
    if (!limit || limit <= 0) {
        limit = 3
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    return {
        limit: parseInt(limit),
        page: parseInt(page),
        skip
    };
}
