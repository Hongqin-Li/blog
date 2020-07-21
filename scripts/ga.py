import argparse
import json
import toml
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials


SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']


def initialize_analyticsreporting(key_file):
    """Initializes an Analytics Reporting API V4 service object.

    Returns:
        An authorized Analytics Reporting API V4 service object.
    """
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        key_file, SCOPES)

    # Build the service object.
    analytics = build('analyticsreporting', 'v4', credentials=credentials)

    return analytics


def get_report(analytics, view_id):
    """Queries the Analytics Reporting API V4.

    Args:
        analytics: An authorized Analytics Reporting API V4 service object.
    Returns:
        The Analytics Reporting API V4 response.
    """
    return analytics.reports().batchGet(
        body={
               'reportRequests': [
                 {
                   'viewId': view_id,
                   'dateRanges': [{'startDate': '2020-07-19',
                                   'endDate': 'today'}],
                   'metrics': [{'expression': 'ga:pageviews'}],
                   'dimensions': [{'name': 'ga:pagePath'}]
                 }
               ]
             }
        ).execute()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--key-file", required=True,
                        help="path to json keyfile")
    parser.add_argument("--config", required=True,
                        help="path to config.toml")
    parser.add_argument("-o", "--output")

    args = parser.parse_args()

    with open(args.config, "r") as f:
        toml = toml.loads(f.read())

    analytics = initialize_analyticsreporting(args.key_file)
    response = get_report(analytics, toml["google-analytics"]["view-id"])
    response = dict([(r["dimensions"][0], int(r["metrics"][0]["values"][0]))
                     for r in response["reports"][0]["data"]["rows"]])

    out = json.dumps(response, ensure_ascii=False, indent=2)
    if args.output:
        with open(args.output, 'w') as f:
            f.write(out)
    else:
        print(out)
    # print_response(response)
