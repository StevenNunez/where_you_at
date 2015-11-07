defmodule WhereYouAt.LocationChannel do
  use WhereYouAt.Web, :channel

  def join("locations:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("locations:" <> user_id, payload, socket) do
    {:ok, socket}
  end

  def handle_in("updated_friend_location", payload, socket) do
    broadcast! socket, "friend_update", payload
    {:noreply, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
