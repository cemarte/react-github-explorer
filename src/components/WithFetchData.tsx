import * as React from "react";

export interface IInjectedProps<T> {
  data: T[];
  onFetchMore: () => void;
  isLoading: boolean;
  error: Error;
}

export interface IWithFetchDataProps {
    url: string;
}
export type IExpandedInjectedProps<T> = object & IInjectedProps<T>;

export interface IWithFetchDataState<T> {
    data: T[];
    isLoading: boolean;
    error: Error;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

// tslint:disable-next-line:typedef
export const WithFetchData = <T, P extends IExpandedInjectedProps<T>>(
  WrappedComponent: React.ComponentType<P>
) =>
  class extends React.Component<
    Subtract<P, IInjectedProps<T>> & IWithFetchDataProps,
    IWithFetchDataState<T>
  > {
    static displayName = `WithFetchData(${WrappedComponent.displayName ||
      WrappedComponent.name})`;
    next: string;
    constructor(props: any) {
      super(props);
      this.state = { data: [], isLoading: false, error: undefined };
    }

    private fetchListData: () => void = () => {
      this.setState({ isLoading: true }, () => {
        fetch(this.next || `${this.props.url}?page=1&per_page=100`).then(
          response => {
            if (response.ok) {
              this.storeNextLink(response.headers);
              response.json().then(moreData => {
                this.setState({ data: [...this.state.data, ...moreData], isLoading: false });
              });
            }
          }
        ).catch((error)=>{
            this.setState({error, isLoading: false})
        });
      });
    };

    private storeNextLink(headers: Headers): void {
      const link: string = headers.get("Link");
      if (link) {
        this.next = link
          .split(";")[0]
          .replace("<", "")
          .replace(">", "");
      }
    }

    public componentDidMount(): void {
      this.fetchListData();
    }

    public render(): JSX.Element {
      const { url, ...props } = this.props as IWithFetchDataProps;
      return (
        <WrappedComponent
          data={this.state.data}
          onFetchMore={this.fetchListData}
          isLoading={this.state.isLoading}
          error={this.state.error}
          {...props}
        />
      );
    }
  };
