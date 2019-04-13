using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Todo;

namespace InterviewTestPagination.Controllers {
    /// <summary>
    /// 'Rest' controller for the <see cref="Todo"/>
    /// model.
    /// 
    /// TODO: implement the pagination Action
    /// </summary>
    public class TodoController : ApiController {

        // TODO: [low priority] setup DI 
        private readonly IModelService<PagedTodo> _todoService = new TodoService();

        [HttpGet]
        public PagedTodo Todos(int pageNumber, int? itemsPerPage) {
            return _todoService.List(pageNumber, itemsPerPage);
        }


    }
}
