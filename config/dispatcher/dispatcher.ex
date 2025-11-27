defmodule Dispatcher do
  use Matcher

  define_accept_types(
    html: ["text/html", "application/xhtml+html"],
    json: ["application/json", "application/vnd.api+json"],
    upload: ["multipart/form-data"],
    sparql_json: ["application/sparql-results+json"],
    any: ["*/*"]
  )
  @any %{}
  @json %{ accept: %{ json: true } }
  @html %{ accept: %{ html: true } }

  define_layers([:api_services, :api, :frontend, :not_found])

  # In order to forward the 'themes' resource to the
  # resource service, use the following forward rule:
  #
  # match "/themes/*path", @json do
  #   Proxy.forward conn, path, "http://resource/themes/"
  # end
  #
  # Run `docker-compose restart dispatcher` after updating
  # this file.

  # Dashboard
  match "/jobs/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://cache/jobs/")
  end
 match "/tasks/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://cache/tasks/")
  end

  match "/data-containers/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://cache/data-containers/")
  end

  match "/job-errors/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://cache/job-errors/")
  end

  match "/harvesting-collections/*path",  %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://cache/harvesting-collections/")
  end
  match "/reports/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/reports/")
  end

  match "/log-entries/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/log-entries/")
  end

  match "/log-levels/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/log-levels/")
  end

  match "/status-codes/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/status-codes/")
  end

  match "/log-sources/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/log-sources/")
  end

  match "/remote-data-objects/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/remote-data-objects/")
  end
  ###############
  # LOGIN
  ###############

  match "/accounts", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, [], "http://resource/accounts/")
  end

  match "/accounts/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://accountdetail/accounts/")
  end

  match "/groups/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://resource/groups/")
  end

  match "/sessions/*path", %{accept: [:json], layer: :api} do
    Proxy.forward(conn, path, "http://login/sessions/")
  end
  #################################################################
  # FILES
  #################################################################

  get "/files/:id/download", %{accept: [:any]} do
    Proxy.forward(conn, [], "http://file/files/" <> id <> "/download")
  end

  get "/files/*path", %{layer: :api_services, accept: %{json: true}} do
    Proxy.forward(conn, path, "http://resource/files/")
  end
  ###############################################################
  # frontend layer
  ###############################################################

  get "/assets/*path",  %{layer: :api }  do
    forward conn, path, "http://frontend-dashboard/assets/"
  end

  get "/@appuniversum/*path",  %{layer: :api} do
    forward conn, path, "http://frontend-dashboard/@appuniversum/"
  end


  get "/*_path", %{layer: :api }  do
    # *_path allows a path to be supplied, but will not yield
    # an error that we don't use the path variable.
    forward conn, [], "http://frontend-dashboard/index.html"
  end
end
