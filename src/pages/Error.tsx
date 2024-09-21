import { A } from "@solidjs/router"

function Error(props: { error?: string }) {
  return (<div class="flex grow flex-col items-center justify-center">
    <i class="ph ph-warning-circle text-9xl"></i>
    <h2 class="text-3xl mb-2">Oops! Something went wrong.</h2>
    <h3><b>Error:</b> {props.error ?? "This page doesn't exist."}</h3>
    <div class="mt-4">
      <a href="" onClick={() => location.reload()} title="Reload current page"><i class="ph ph-arrow-clockwise text-4xl mr-2"></i></a>
      <A href="/" title="Go home"><i class="ph ph-house text-4xl mr-2"></i></A>
      <a href="https://github.com/orgs/ionic-bot/discussions" title="GitHub Discussions (report an issue)"><i class="ph ph-github-logo text-4xl"></i></a>
    </div>
  </div>)
}

export default Error
