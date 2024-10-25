export const wrapperComponent = getAll => {
  const getWrap = async (req, res, next) => {
    try {
      await getAll(req, res, next);
    } catch (err) {
      next(err);
    }
  }; return getWrap
};
