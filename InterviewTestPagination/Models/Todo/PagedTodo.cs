using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InterviewTestPagination.Models.Todo
{
    public class PagedTodo
    {
        private readonly List<Todo> todos = new List<Todo>();

        public IEnumerable<Todo> Data => todos;

        public void AddTodos(IEnumerable<Todo> todos)
        {
            this.todos.AddRange(todos);
        }

        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
    }
}