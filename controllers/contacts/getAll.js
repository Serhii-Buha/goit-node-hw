const { Contact } = require("../../models");

exports.getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    // Создайте объект фильтрации
    const filter = { owner };

    // Если запрос содержит параметр favorite, добавьте его в фильтр
    if (favorite !== undefined) filter.favorite = favorite === "true";
    //     Здесь проверяется, задан ли параметр favorite в строке запроса (req.query). Если он задан, то в объект filter добавляется свойство favorite. Значение favorite будет true если в строке запроса favorite равен "true", и false в противном случае. Это связано с тем, что все параметры в строке запроса передаются как строки, поэтому мы сравниваем его со строкой "true".

    // Теперь объект filter может выглядеть следующим образом:

    // Если favorite не указан в строке запроса: { owner: 'some_user_id' }.
    // Если favorite указан в строке запроса и равен "true": { owner: 'some_user_id', favorite: true }.
    // Если favorite указан в строке запроса и не равен "true": { owner: 'some_user_id', favorite: false }.
    // Этот объект filter затем используется в запросе к MongoDB для выборки документов из коллекции Contact:

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "_id email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};
