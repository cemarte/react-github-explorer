import * as React from "react";

export interface IInjectedProps {
    data: any[];
    onFetchMore: () => void;
}

export interface IWithFetchDataState {
    data: any[];
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

// tslint:disable-next-line:typedef
export const WithFetchData =
    <P extends IInjectedProps>(WrappedComponent: React.ComponentType<P>, url: string) =>
        class extends React.Component<Subtract<P, IInjectedProps>, IWithFetchDataState> {
            static displayName = `WithFetchData(${WrappedComponent.displayName || WrappedComponent.name})`;
            next: string;
            constructor(props: any) {
                super(props);
                this.state = { data: [] };
            }

            private fetchListData: () => void = () => {
                fetch(this.next || `${url}?page=1&per_page=100`).then((response) => {
                    if (response.ok) {
                        this.next = response.headers.get("Link").split(";")[0].replace("<", "").replace(">", "");
                        response.json().then((repos) => {
                            this.setState({ data: [...this.state.data, ...repos] });
                        });
                    }
                });
            }

            componentDidMount(): void {
                fetch(url)
                    .then(response => response.json())
                    .then(data => this.setState({ data }))
                    .catch(console.error);
            }

            public render(): JSX.Element {
                return (
                    <WrappedComponent
                        data={this.state.data}
                        onFetchMore={this.fetchListData}
                        {...this.props} />);
            }
        };