defmodule WhereYouAt.PageController do
  use WhereYouAt.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
