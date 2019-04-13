using System;
using System.Collections.Generic;
using System.Linq;

namespace InterviewTestPagination.Models.Todo {
    /// <summary>
    /// TODO: Implement methods that enable pagination
    /// </summary>
    public class TodoService : IModelService<PagedTodo> {

        private readonly IModelRepository<Todo> _repository = new TodoRepository();

        /// <summary>
        /// Example implementation of List method: lists all entries of type <see cref="Todo"/>
        /// </summary>
        /// <returns></returns>
        public PagedTodo List(int pageNumber, int? itemsPerPage) {
            var todos = _repository.All().ToList();
            var totalCount = todos.Count;
            
            if (itemsPerPage != null)
                todos = todos.Skip((pageNumber - 1) * itemsPerPage.Value).Take(itemsPerPage.Value).ToList();

            var pagedTodo = new PagedTodo();
            pagedTodo.AddTodos(todos);
            pagedTodo.TotalItems = totalCount;
            pagedTodo.TotalPages = itemsPerPage != null ? (int)Math.Ceiling(totalCount/(decimal)itemsPerPage) : 1;
            return pagedTodo;
        }
    }
}
